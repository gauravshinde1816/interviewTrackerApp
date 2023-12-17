package controller

import (
	"context"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/gauravshinde1816/interview_tracker_app/model"
)

// InterviewController struct holds the MongoDB client
type InterviewController struct {
	client *mongo.Client
}

// NewInterviewController creates a new InterviewController with the given MongoDB client
func NewInterviewController(client *mongo.Client) *InterviewController {
	return &InterviewController{client: client}
}

// AddInterview handles adding a new interview
func (ic *InterviewController) AddInterview(c *gin.Context) {
	var interview model.Interview
	if err := c.ShouldBindJSON(&interview); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	collection := ic.client.Database("interview_tracker_db").Collection("interviews")
	if _, err := collection.InsertOne(context.Background(), interview); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add interview"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Interview added successfully"})
}

// Provide feedback and rating to Interview
func (ic *InterviewController) GiveFeedbackAndRatingToInterview(c *gin.Context) {
	interviewID := c.Param("id")
	objID, err := primitive.ObjectIDFromHex(interviewID)

	if err != nil {
		// Handle invalid ObjectId error
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid interview ID"})
		return
	}

	// Now use objID in your filter
	filter := bson.M{"_id": objID}

	var interview model.Interview
	if err := c.ShouldBindJSON(&interview); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	update := bson.M{"$set": bson.M{"interview_feedback": interview.InterviewFeedback, "rating": interview.Rating, "status": "COMPLETED"}}
	options := options.FindOneAndUpdate().SetReturnDocument(options.After)

	collection := ic.client.Database("interview_tracker_db").Collection("interviews")
	result := collection.FindOneAndUpdate(context.Background(), filter, update, options)
	fmt.Println(result)

	if result.Err() != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Err()})
		return
	}

	var updatedInterview model.Interview
	if err := result.Decode(&updatedInterview); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode updated interview"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Interview updated successfully", "interview": updatedInterview})
}

// GetInterviews handles getting all interviews
func (ic *InterviewController) GetInterviews(c *gin.Context) {
	collection := ic.client.Database("interview_tracker_db").Collection("interviews")
	options := options.Find().SetProjection(bson.M{"_id": 1, "interviewee": 1, "status": 1, "interview_feedback": 1, "rating": 1})

	cursor, err := collection.Find(context.Background(), bson.M{}, options)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get interviews"})
		return
	}
	defer cursor.Close(context.Background())

	var interviews []model.Interview
	if err := cursor.All(context.Background(), &interviews); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode interviews"})
		return
	}

	c.JSON(http.StatusOK, interviews)
}

// DeleteInterview handles deleting an interview
func (ic *InterviewController) DeleteInterview(c *gin.Context) {
	interviewID := c.Param("id")
	objID, err := primitive.ObjectIDFromHex(interviewID)

	if err != nil {
		// Handle invalid ObjectId error
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid interview ID"})
		return
	}

	// Now use objID in your filter
	filter := bson.M{"_id": objID}

	collection := ic.client.Database("interview_tracker_db").Collection("interviews")
	if _, err := collection.DeleteOne(context.Background(), filter); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete interview"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Interview deleted successfully"})
}
