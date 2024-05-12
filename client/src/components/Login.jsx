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
      // <p>Login Successful</p>
      alert("Login success")
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
    {/* <form>
      <input type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}  />
      <input type={show?"text":"password"} placeholder='Password' onChange={(e)=>setPassword(e.target.value)}  />
      <button className='' onClick={clickedFunc}>{show?"Hide":"Show"}</button>
    </form>
    <button onClick={submitFunc}>Sign In</button> */}
    
    <form class="max-w-sm mx-auto mt-8">
  <input type="email" placeholder='Email' class="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500" onChange={(e)=>setEmail(e.target.value)} />
  <input type={show?"text":"password"} placeholder='Password' class="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500" onChange={(e)=>setPassword(e.target.value)} />
  <button class="w-full px-4 py-2 mb-4 text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600" onClick={clickedFunc}>{show?"Hide":"Show"}</button>
</form>
<button class="block w-full max-w-sm mx-auto px-4 py-2 mt-4 text-white bg-green-500 rounded-md focus:outline-none hover:bg-green-600" onClick={submitFunc}>Sign In</button>

    </>
  )
  }
export default Login