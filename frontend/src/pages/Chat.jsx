import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { allUsersRoute, allUserDataRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import Header from "../components/Header"

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [latestMessage, setLatestMessage] = useState([])
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)
          )
        );
      }
    })();
  }, []);
  
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  
  useEffect(() => {
    (async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data)
        } else {
          navigate("/setavatar");
        }
      }
    })();
  }, [currentUser]);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUserDataRoute}/${currentUser._id}`);
          setLatestMessage(data.data)
        } else {
          navigate("/setavatar");
        }
      }
    })();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
    
    <Header/>
      <div className="flex border">
        <Contacts className="" contacts={contacts} latestMessage={latestMessage} changeChat={handleChatChange} />
        {currentChat === undefined ? (
          <Welcome className="" />
        ) : (
          <ChatContainer className="" currentChat={currentChat} socket={socket} />
        )}
      </div>
    </>
  );
}
