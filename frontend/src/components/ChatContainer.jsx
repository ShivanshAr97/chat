import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await JSON.parse(
        localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)
      );
      const response = await axios.post(recieveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    })();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="border">
        <div className="flex border border-red-700 items-center justify-between w-[75rem]">
          <div className="flex items-center gap-4 mx-4">
            
          <img
            className="w-16 h-16 rounded-full border border-black"
            src={currentChat.avatarImage}
            alt=""
            />
          <h3>{currentChat.username}</h3>
            </div>
          <Logout />
        </div>
        <div className="h-[32rem]">
          {messages.map((message) => {
            return (
              <div ref={scrollRef} key={uuidv4()}>
                <div
                  className={`message ${
                    message.fromSelf ? "sended" : "recieved"
                  }`}
                >
                  <div className=" ">
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </>
  );
}
