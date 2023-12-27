/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LOyl5Wee15h
 */

import { useEffect, useState } from "react";
import { connect, sendMsg, initializeSocket } from "../api";
import { useNavigate } from "react-router-dom";
import CreateRoom from "../components/CreateRoom";
import Chat from './chat'
import Room from "../components/Room";

export default function MainPage() {
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
  const [room_id, setRoomId] = useState("");
  function handleRoomIdChange(val) {
    setRoomId(val);
  }
  return (
    <div className=" w-full">
      <main className="container mx-auto p-6 bg-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-2 bg-white rounded-lg shadow-lg p-6">
            <div className="flex">
            <a className="text-2xl font-bold mb-2 text-indigo-700" onClick={() => setRoomId("")}>Chat</a>
            <CreateRoom handleRoomIdChange={handleRoomIdChange} />
            </div>
              {room_id != "" ? <Room roomId={room_id}/>: <Chat messages={messages} /> } 
            </div>
          
          <div className="space-y-4">
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-lg"
              data-v0-t="card"
            >
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-lg leading-6 font-medium text-indigo-700">
                  Online Users
                </h3>
              </div>
              <div className="p-6">
                <ul className="divide-y divide-gray-200">
                  {users.map((msg, index) => (
                    <li className="py-4 flex">
                      <span className="relative flex shrink-0 overflow-hidden w-10 h-10 rounded-full">
                        <span className="absolute top-1 right-1 block w-3 h-3 rounded-full bg-green-600"></span>
                      </span>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {msg}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-lg mt-6"
              data-v0-t="card"
            >
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-lg leading-6 font-medium text-indigo-700">
                  Updates
                </h3>
              </div>
              <div
                className="h-full w-full rounded-[inherit]"
                //   style="overflow: hidden scroll;"
              >
                <div
                  dir="ltr"
                  className="relative overflow-hidden h-96 mb-4 bg-gray-200 p-4 rounded-md overflow-y-auto mx-4"
                  // ="position: relative; --radix-scroll-area-corner-width: 0px; --radix-scroll-area-corner-height: 0px;"
                >
                  {updates.map((msg, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-indigo-600">
                            {returnMessage(msg, "body")}
                          </h3>
                        </div>
                        <p className="text-gray-700">
                          {returnMessage(msg, "user")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
