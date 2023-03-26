import React from "react";
import { useSelector } from "react-redux";

const Messages = ({ messages = [] }) => {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};

  return (
    <div className="relative w-full p-6 overflow-y-auto">
      <ul className="space-y-2">
        {messages
          .slice()
          .sort((a, b) => a.timestamp - b.timestamp)
          .map((message) => {
            const { id, sender, message: lastMessage } = message || {};
            const justify = sender.email !== email ? "start" : "end";

            return (
              <li className={`flex justify-${justify}`} key={id}>
                <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                  <span className="block">{lastMessage}</span>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Messages;
