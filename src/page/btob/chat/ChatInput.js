import React, { useState } from "react";
import { db } from "../../../firebase";

const ChatInput = ({ userData, roomId }) => {
  const [input, setInput] = useState("");

  const sendMessage = e => {
    e.preventDefault();

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      createdAt: new Date(),
      user: userData.email,
    });
    setInput("");
  };
  return (
    <form>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="send a Message"
      />
      <button type="submit" onClick={sendMessage}>
        SEND
      </button>
    </form>
  );
};

export default ChatInput;
