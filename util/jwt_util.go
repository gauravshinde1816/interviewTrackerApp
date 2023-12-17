package util

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

func GenerateToken(username string) string {

	secretKey := []byte("secret")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		panic(err)
	}

	return tokenString
}
