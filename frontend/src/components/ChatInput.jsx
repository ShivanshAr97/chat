import React, { useState } from "react";
import { IoMdAttach } from "react-icons/io";
import { IoMdSend } from "react-icons/io";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
 
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <>
      <form onSubmit={(event) => sendChat(event)}>
        <button><IoMdAttach /></button>
        <input
        className="border-2 text-xl py-2 px-4 rounded-lg w-[80%]"
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button className="bg-blue-400 p-3 rounded-full mx-4" type="submit">
          <IoMdSend size={20} />
        </button>
      </form>
      </>
  );
}
