import React from 'react'
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../assets/chatLogics.js"
import { ChatState } from "../context/ChatProvider";


const Scroll = ({messages}) => {
  const {user} = ChatState()
  return (
    <>
    {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id))}
            <span>
              {m.content}
            </span>
          </div>
        ))}
    </>
  )
}

export default Scroll