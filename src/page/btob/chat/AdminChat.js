import React, { useEffect, useState } from "react";
import AdminChatSidebar from "./AdminChatSidebar";
import { db } from "../../../firebase";
import AdminChatDetails from "./AdminChatDetails";

const AdminChat = ({ user }) => {
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState();
  const [messages, setMessages] = useState();

  useEffect(() => {
    db.collection("rooms").onSnapshot(snapshot =>
      setRooms(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
    );
    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("createdAt", "asc")
      .onSnapshot(snapshot =>
        setMessages(
          snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))
        )
      );
  }, [roomId]);
  return (
    <div className="flex flex-row  h-full w-screen">
      <AdminChatSidebar rooms={rooms} setRoomId={setRoomId} />
      {roomId ? (
        <AdminChatDetails messages={messages} roomId={roomId} user={user} />
      ) : (
        "유저선택"
      )}
    </div>
  );
};

export default AdminChat;
