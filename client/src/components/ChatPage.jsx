import { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import SideSearch from "./SideSearch";
import AllChats from "./AllChats";
import SingleChat from "./SingleChat";

const Chatpage = () => {
  const { user } = ChatState();

  return (
    <div >
        {user && <SideSearch/>}
      <div>
            {user && <AllChats/>}
            {user && <SingleChat/>}
      </div>
    </div>
  );
};

export default Chatpage;