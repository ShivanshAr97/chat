import React, { useEffect, useState } from 'react'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/';

const Homepage = () => {

  const [chats, setChats] = useState([])

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