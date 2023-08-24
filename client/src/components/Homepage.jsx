import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

axios.defaults.baseURL = 'http://localhost:5000/';

const Homepage = () => {

  const [chats, setChats] = useState([])
  const navigate = useNavigate();

    const getUser = async()=>{
    try {
      const {data} = await axios.get('/chats');
      console.log(data);
      setChats(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/chats");
  }, [navigate]);
  
  useEffect(() => {
    getUser()
  }, [])
  

  return (
    <>
    {chats.map((chat)=>{
      return <div>{chat.name}</div>
    })}
    </>
  )
}

export default Homepage