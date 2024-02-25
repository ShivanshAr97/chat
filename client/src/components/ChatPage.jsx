import { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import SideSearch from "./SideSearch";
import AllChats from "./AllChats";
import SingleChat from "./SingleChat";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div >
        {user && <SideSearch/>}
      <div>
            {user && <AllChats fetchAgain = {fetchAgain}/>}
            {user && <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </div>
    </div>
  );
};

export default Chatpage;