import React from "react";
import ChatInput from "./ChatInput";
import Message from "./Message";

const AdminChatDetails = ({ messages, user, roomId }) => {
  return (
    <div className="bg-gray-100 w-full h-screen overflow-y-scroll">
      {messages?.map(doc => {
        const { user, message, createdAt } = doc.data;

        return (
          <Message
            key={doc.id}
            user={user}
            message={message}
            createdAt={createdAt}
          />
        );
      })}
      <ChatInput userData={user} roomId={roomId} />
    </div>
  );
};

export default AdminChatDetails;
