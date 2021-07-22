import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import Message from "./Message";

const CustomerChat = ({ userData }) => {
  const [roomId, setRoomId] = useState();
  const [messages, setMessages] = useState();
  useEffect(() => {
    db.collection("rooms")
      .where("userName", "==", userData.email)
      .get()
      .then(snapshot => snapshot.forEach(doc => setRoomId(doc.id)));
    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("createdAt", "asc")
      .onSnapshot(snapshot =>
        setMessages(
          snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))
        )
      );
  }, [roomId, userData.email]);

  return (
    <div className="bg-gray-100">
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
    </div>
  );
};

export default CustomerChat;
