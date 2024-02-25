import SingleChat from "./SingleChat";
import { ChatState } from "../context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
  )
}

export default ChatBox