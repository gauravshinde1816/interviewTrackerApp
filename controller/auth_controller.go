package controller

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"

	"github.com/gauravshinde1816/interview_tracker_app/model"
	"github.com/gauravshinde1816/interview_tracker_app/util"
)

type AuthController struct {
	client *mongo.Client
}

// NewUserController creates a new UserController with the given MongoDB client
func NewUserController(client *mongo.Client) *AuthController {
	return &AuthController{client: client}
}

// SignUp handles user registration
func (authController *AuthController) SignUp(c *gin.Context) {
	var user model.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	collection := authController.client.Database("interview_tracker_db").Collection("users")
	if _, err := collection.InsertOne(context.Background(), user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}
	token := util.GenerateToken(user.Username)
	c.JSON(http.StatusOK, gin.H{"token": token})
}

// SignIn handles user login
func (authController *AuthController) SignIn(c *gin.Context) {
	var user model.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	collection := authController.client.Database("interview_tracker_db").Collection("users")
	err := collection.FindOne(context.Background(), bson.M{"username": user.Username, "password": user.Password}).Err()
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	token := util.GenerateToken(user.Username)
	c.JSON(http.StatusOK, gin.H{"token": token})
}
