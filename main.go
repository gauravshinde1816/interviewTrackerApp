package main

import (
	"github.com/gauravshinde1816/interview_tracker_app/controller"
	"github.com/gauravshinde1816/interview_tracker_app/db"
	"github.com/gauravshinde1816/interview_tracker_app/middleware"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	// Initialize Gin router
	router := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*"} // Specify your frontend origin(s)
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Authorization", "Content-Type"}
	router.Use(cors.New(config))

	// db connection
	client := db.InitDB()

	userController := controller.NewUserController(client)
	interviewController := controller.NewInterviewController(client)

	// Define routes
	router.POST("/signup", userController.SignUp)
	router.POST("/signin", userController.SignIn)

	// Routes for interview controller (protected with JWT middleware)
	interviewRoutes := router.Group("/interviews")
	interviewRoutes.Use(middleware.AuthMiddleware) // Apply the JWT authentication middleware
	{
		interviewRoutes.POST("", interviewController.AddInterview)
		interviewRoutes.GET("", interviewController.GetInterviews)
		interviewRoutes.DELETE("/:id", interviewController.DeleteInterview)
		interviewRoutes.PUT("/:id", interviewController.GiveFeedbackAndRatingToInterview)
	}

	// Run the server
	router.Run(":8080")
}
