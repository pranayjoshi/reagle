/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LOyl5Wee15h
 */

import { useEffect, useState } from "react";
import { connect, sendMsg, initializeSocket } from "../api";
import { useNavigate } from "react-router-dom";
import CreateRoom from "../components/CreateRoom";

export default function Chat({messages}) {
  const [message, setMessage] = useState("");
  function returnMessage(message, index) {
    return message[index];
  }
  function send() {
    sendMsg(message);
    setMessage("");
  }
  return (
    <div className="bg-white">
      <div
        dir="ltr"
        className="relative overflow-hidden h-96 mb-4 bg-gray-200 p-4 rounded-md overflow-y-auto"
        // ="position: relative; --radix-scroll-area-corner-width: 0px; --radix-scroll-area-corner-height: 0px;"
      >
        <style></style>
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
      </div>
      <div className="flex w-full items-center space-x-2">
              <input
                className="flex h-10 w-full border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Type your message here..."
                type="text"
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
                value={message}
              />
              <button
                onClick={(event) => send()}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Send
              </button>
            </div>
    </div>
  );
}
