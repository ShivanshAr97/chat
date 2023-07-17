import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Homepage = () => {

  const [chats, setChats] = useState([])

    const getUser = async()=>{
    try {
      const response = await axios.get('/chats');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    getUser()
  }, [])
  

  return (
    <>
    lev
    </>
  )
}

export default Homepage