package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	chat "github.com/pranayjoshi/reagle/pkg/chat"
	"github.com/pranayjoshi/reagle/pkg/video_chat"
)

func serveWS(pool *chat.Pool, w http.ResponseWriter, r *http.Request, user string) {
	fmt.Println("chat endpoint reached")

	conn, err := chat.Upgrade(w, r)

	if err != nil {
		fmt.Fprintf(w, "%+v\n", err)
	}
	fmt.Println("Connection Established:   awawdwawd: ", user)
	client := &chat.Client{
		Conn: conn,
		Pool: pool,
		User: user,
	}
	pool.Register <- client
	client.Read()
}

func setupRoutes() {

	type User struct {
		Username string `json:"username"`
	}
	var user *User
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if user == nil {
			user = &User{}
		}
		w.Header().Set("Access-Control-Allow-Origin", "*")
		user.Username = strings.TrimPrefix(r.URL.Path, "/")
		if user.Username != "" {
			user := &User{Username: user.Username}
			w.Header().Set("Content-Type", "application/json")
			err := json.NewEncoder(w).Encode(user)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
		}

	})

	pool := chat.NewPool()
	go pool.Start()
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("User: ", user.Username)
		if user != nil {
			serveWS(pool, w, r, user.Username)
		} else {
			// Handle the case where user is nil
			http.Error(w, "User is not set", http.StatusBadRequest)
			return
		}
	})

	video_chat.AllRooms.Init()

	http.HandleFunc("/create", video_chat.CreateRoomRequestHandler)
	http.HandleFunc("/join", video_chat.JoinRoomRequestHandler)
}

func main() {
	fmt.Println("Server running on port 9000")
	setupRoutes()

	err := http.ListenAndServe(":9000", nil)
	if err != nil {
		log.Fatal(err)
	}
}
