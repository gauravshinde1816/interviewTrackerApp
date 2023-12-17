package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Interview struct {
	ID                primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Interviewee       string             `json:"interviewee" bson:"interviewee"`
	Status            string             `json:"status" bson:"status"`
	InterviewFeedback string             `json:"interview_feedback" bson:"interview_feedback"`
	Rating            int                `json:"rating" bson:"rating"`
}
