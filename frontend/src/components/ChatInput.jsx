import React, { useState } from "react";
import { IoMdAttach } from "react-icons/io";
import { IoMdSend } from "react-icons/io";

import axios from "axios";

export default function ChatInput({ handleSendMsg }) {
  const [msg1, setMsg1] = useState("");
  const [msg2, setMsg2] = useState("");

  async function generateAnswer(e) {
    e.preventDefault();
    console.log("loading");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
          import.meta.env.VITE_GENERATIVE_LANGUAGE_CLIENT
        }`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: msg1 }] }],
        },
      });
      console.log(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      console.log(error);
    }
  }

  const sendChat = (event) => {
    event.preventDefault();
    // generateAnswer(event);
    if (msg1.length > 0) {
      handleSendMsg(msg1, msg2);
      setMsg1("");
      // setMsg2("");
    }
  };

  return (
    <>
      <form onSubmit={(event) => sendChat(event)}>
        <button>
          <IoMdAttach />
        </button>
        <input
          className="border-2 text-xl py-2 px-4 rounded-lg w-[80%]"
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMsg1(e.target.value)}
          value={msg1}
        />
        <button className="bg-blue-400 p-3 rounded-full mx-4" type="submit">
          <IoMdSend size={20} />
        </button>
      </form>
    </>
  );
}
