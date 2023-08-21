import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Register = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [pic, setPic] = useState()
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)

  const navigate = useNavigate();

  const clickedFunc=(e)=>{
      setShow(!show)
      e.preventDefault()
  }

  const pictureFunc=(pics)=>{
    setLoading(true)
    if(pics===undefined){
      <p>Error</p>
      setErrorMessage('Error uploading image');
      setLoading(false);
      return;
    }
    console.log(pics);
    if(pics.type === 'image/jpeg'|| pics.type==='image/png'){
      const data = new FormData()
      data.append("file", pics)
      data.append("upload_preset", "ChatModel")
      data.append("cloud_name","dn2oxlhw7")
      fetch("https://api.cloudinary.com/v1_1/dn2oxlhw7/image/upload",{
        method:"post",
        body:data
      }).then((res)=>res.json())
      .then(data=>{
        setPic(data.url.toString())
        console.log(data.url.toString());
        setLoading(false)
      })
      .catch((e)=>{
        console.log(e);
        setLoading(false)
      })
    }
    else{
      <p>Select an image</p>
      setLoading(false);
      return;
    }
  }

    
  const submitFunc=async()=>{
    setLoading(true)
    if(!email || !name || !password){
      <p>Fill Fields</p>
      setLoading(false)
      return
    }
    console.log(name,email,password,pic);
    try {
      const config = {
        headers:{
          "Content-type":"application/json",
        },
      }
      const {data} = await axios.post("/api/user",{name, email, password, picture:pic},config)
      localStorage.setItem("userInfo",JSON.stringify(data))
      navigate("/chats");
      setLoading(false)
      console.log(data);

    } catch (e) {
      setLoading(false);
      console.log(e);
      <p>Error</p>
    }
  }


  return (
    <>
    <form>
    <input type="text" placeholder='Name' onChange={(e)=>setName(e.target.value)}  />
    <input type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}  />
    <input type={show?"text":"password"} placeholder='Password' onChange={(e)=>setPassword(e.target.value)}  />
    <button className='' onClick={clickedFunc}>{show?"Hide":"Show"}</button>
    <input type="file" accept='image/*' onChange={(e)=>pictureFunc(e.target.files[0])} />
    </form>
    <button type='submit' onClick={submitFunc}>Sign In</button>
    </>
  )
}

export default Register