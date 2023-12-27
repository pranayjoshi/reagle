/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LOyl5Wee15h
 */

import { useEffect, useState } from "react";
import { connect, sendMsg, initializeSocket } from "../api";
import { useNavigate } from "react-router-dom";
import CreateRoom from "../components/CreateRoom";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    initializeSocket();
    connect((msg) => {
      msg = JSON.parse(msg.data);
      if (msg.type == "message") {
        setMessages((messages) => [...messages, msg]);
      }
      if (msg.type == "updates") {
        setUpdates((updates) => [...updates, msg]);
        console.log(updates);
        if (msg.body.includes("joined")) {
          setUsers((users) => [...users, msg.user]);
        } else {
          setUsers((users) => users.filter((user) => user != msg.user));
        }
      }
      console.log(messages);
    });
  }, []); // Add this line
  const [message, setMessage] = useState("");
  function returnMessage(message, index) {
    return message[index];
  }
  function send() {
    sendMsg(message);
    setMessage("");
  }
  return (
    <div
      className="h-full w-full rounded-[inherit]"
      //   style="overflow: hidden scroll;"
    >
      {messages.map((msg, index) => (
        <div key={index} className="flex items-start space-x-4">
          <span className="relative flex shrink-0 overflow-hidden w-10 h-10 rounded-full"></span>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-indigo-600">
                {returnMessage(msg, "user")}
              </h3>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-blue-200 text-blue-800">
                {Date(msg.timeStamp * 1000)}
              </div>
            </div>
            <p className="text-gray-700">{returnMessage(msg, "body")}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
