import React, { useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import ChatLoading from '../components/ChatLoading'
import SingleModal from '../components/SingleModal'
import {getSender} from '../assets/chatLogics.js'
import UserList from '../components/UserList.jsx'

const SideSearch = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
    const [search, setSearch] = useState("")
    const [searchList, setSearchList] = useState([])
    const [loading,setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState(false);
    const navigate = useNavigate();

    const {
      setSelectedChat,
      user,
      notification,
      setNotification,
      chats,
      setChats,
    } = ChatState();

    const logout=()=>{
      localStorage.removeItem("userInfo")
      navigate("/")
    }

    const handleSearch = async () => {
      if (!search) {
        console.log("Please Enter something in search");
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
  
        setLoading(false);
        setSearchResult(data);
      } catch (error) {
        console.log("Failed to Load the Search Results", error);
      }
    };

  return (

    <>
<nav className="bg-gray-800 p-4 flex justify-between items-center text-white">
  <div className="flex items-center space-x-4">
    <div>Search</div>
  </div>
  <div className="flex items-center space-x-4">
    <div className="font-bold">Site Name</div>
  </div>
  
  <div>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={toggleDropdown}
      >
        Dropdown button
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
            </li>
          </ul>
        </div>
      )}
    </div>

  </nav>

    </>
  )
}

export default SideSearch