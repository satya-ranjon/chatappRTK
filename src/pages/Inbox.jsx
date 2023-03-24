import React from "react";
import { Outlet, useParams } from "react-router-dom";
import ConversationList from "../components/inbox/sidebar/ConversationList";
import Navbar from "../components/Navbar/Navbar";

const Inbox = () => {
  const { id } = useParams();
  let content;

  if (!id) {
    content = (
      <div className="text-center">
        No messages selected! Select an user from left sidebar to view all
        messages
      </div>
    );
  } else {
    content = <Outlet />;
  }
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto -mt-1">
        <div className="min-w-full border rounded flex lg:grid lg:grid-cols-3">
          <ConversationList />
          <div className="w-full lg:col-span-2 lg:block">
            <div className="w-full grid conversation-row-grid">{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
