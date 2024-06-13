import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import Call from "./Call";

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

  const handleSendMsg = async (msg1, msg2) => {
    const data = await JSON.parse(
      localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)
    );
    if (currentChat.username === "ConvoAI") {
      console.log("Using AI integration for ConvoAI");
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
        msg2 = response["data"]["candidates"][0]["content"]["parts"][0]["text"];
        console.log(msg2);
      } catch (error) {
        console.log(error);
      }
    } else {
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: data._id,
        msg1,
      });
    }
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg1,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg1 });
    setMessages(msgs);
    msgs.push({ fromSelf: true, message: msg2 });
    setMessages(msgs);
  };

  // console.log(currentChat);

  // console.log(messages);
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg1) => {
        setArrivalMessage({ fromSelf: false, message: msg1 });
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
      <div className="">
        <div className="flex border-red-700 items-center justify-between w-[74.5rem]">
          <div className="flex items-center gap-4 mx-4">
            <img
              className="w-16 h-16 rounded-full border my-2"
              src={currentChat.avatarImage}
              alt=""
            />
            <h3>{currentChat.username}</h3>
          </div>
          <Call />
        </div>
        <div className="border-b shadow-sm"></div>
        <div className="h-[31rem] overflow-y-scroll">
          {messages.map((message) => {
            return (
              <div ref={scrollRef} key={uuidv4()}>
                <div
                  className={`message ${
                    message.fromSelf ? "sended" : "received"
                  }`}
                >
                  {message.fromSelf ? (
                    <div className="justify-end flex">
                      <p className=" bg-blue-300 items-end  my-2 mx-2 rounded-md  w-fit px-4 py-1">{message.message}</p>
                    </div>
                  ) : (
                    <p className="items-end  my-2 mx-2 rounded-md  w-fit px-4 py-1 bg-gray-200  flex">
                      {message.message}
                    </p>
                  )}
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
