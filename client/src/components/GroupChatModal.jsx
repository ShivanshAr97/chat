  import axios from "axios";
  import { useState } from "react";
  import { ChatState } from "../context/ChatProvider";
  import UserBadgeItem from "../components/UserBadge";
  import UserListItem from "../components/UserList";
  
  const GroupChatModal = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const { user, chats, setChats } = ChatState();
  
    const handleGroup = (userToAdd) => {
      if (selectedUsers.includes(userToAdd)) {
        console.log("User already added");
        return;
      }
  
      setSelectedUsers([...selectedUsers, userToAdd]);
    };
  
    const handleSearch = async (query) => {
      setSearch(query);
      if (!query) {
        return;
      }
  
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`/api/user?search=${search}`, config);
        console.log(data);
        setLoading(false);
        setSearchResult(data);
      } catch (error) {
        console.log("Error Occured!", error);
      }
    };
  
    const handleDelete = (delUser) => {
      setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    };
  
    const handleSubmit = async () => {
      if (!groupChatName || !selectedUsers) {
        console.log("Please fill all the fields");
        
        return;
      }
  
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          `/api/chat/creategroup`,
          {
            name: groupChatName,
            users: JSON.stringify(selectedUsers.map((u) => u._id)),
          },
          config
        );
        setChats([data, ...chats]);
        onClose();
        console.log("New Group Chat Created!");
      } catch (error) {
        console.log("Failed to Create the Chat!", error);
      }
    };
  
    function onOpen() {
      setIsOpen(true);
    }
    function onClose(){
      setIsOpen(false)
    }
  
    return (
      <>
      <span onClick={onOpen}>{children}</span>

      {/* Replace Chakra UI Modal components with Tailwind CSS */}
      <div className={`fixed inset-0 overflow-y-auto ${isOpen ? "block" : "hidden"}`}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Create Group Chat</h3>

              <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                
                  <input
                    type="text"
                    placeholder="Chat Name"
                    className="border p-2 mb-3 w-full"
                    onChange={(e) => setGroupChatName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Add Users eg: John, Piyush, Jane"
                    className="border p-2 mb-1 w-full"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                <div className="w-full flex flex-wrap">
                  {selectedUsers.map((u) => (
                    <div key={u._id} className="bg-gray-200 p-2 m-1 rounded">
                      {/* Replace UserBadgeItem with your custom component */}
                      {u.name}
                      <button onClick={() => handleDelete(u)}>Remove</button>
                    </div>
                  ))}
                </div>
                {loading ? <div>Loading...</div> : 
                  searchResult
                    ?.slice(0, 4)
                    .map((data) => (
                      <div key={data._id} className="bg-gray-100 p-2 m-1 rounded">
                        {/* Replace UserListItem with your custom component */}
                        {data.name}
                        <button className="border px-2" onClick={() => handleGroup(data)}>Add</button>
                      </div>
                    ))
                }
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button onClick={handleSubmit} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                Create Chat
              </button>
              <button onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
    );
  };
  
  export default GroupChatModal;
  