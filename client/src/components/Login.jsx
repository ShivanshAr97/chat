import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [show, setShow] = useState(false)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();

  const clickedFunc=()=>{
      setShow(!show)
  }

  const submitFunc= async()=>{
    setLoading(true);
    if (!email || !password) {
      <p>Fill all fields</p>
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post("/api/user/login",{ email, password },config);
      <p>Login Successful</p>
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats")

    } catch (error) {
      <p>Error occured</p>
      setLoading(false);
    }
  };


  return (
    <>
    <form>
      <input type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}  />
      <input type={show?"text":"password"} placeholder='Password' onChange={(e)=>setPassword(e.target.value)}  />
      <button className='' onClick={clickedFunc}>{show?"Hide":"Show"}</button>
    </form>
    <button onClick={submitFunc}>Sign In</button>
    </>
  )
  }
export default Login