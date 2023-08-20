import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [show, setShow] = useState(false)

  const clickedFunc=(e)=>{
      setShow(!show)
      e.preventDefault()
  }

  const pictureFunc=(pics)=>{

  }

  const submitFunc=()=>{

  }

  return (
    <>
    <form>
      <input type="text" placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}  />
      <input type={show?"text":"password"} placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}  />
      <button className='' onClick={clickedFunc}>{show?"Hide":"Show"}</button>
    </form>
    <button onClick={submitFunc}>Sign In</button>
    </>
  )
}

export default Login