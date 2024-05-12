import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Register from './Register';

axios.defaults.baseURL = 'http://localhost:5000/';

const Homepage = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/chats");
  }, [navigate]);

  return (
    <>
    <p>Hi</p>
    <Register/>
    </>
  )
}

export default Homepage