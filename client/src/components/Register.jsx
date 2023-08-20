import React, { useState } from 'react'

const Register = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [pics, setPics] = useState()
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)

  const clickedFunc=(e)=>{
      setShow(!show)
      e.preventDefault()
  }

  const pictureFunc=(pics)=>{
    setLoading(true)
    if(pics===undefined){
      setErrorMessage('Error uploading image');
      setLoading(false);
      return;
    }
    if(pics.type === 'file/jpeg'|| pics.type==='file/png'){
      const data = new FormData()
      data.append("file", pics)
      data.append("upload_presets", "chatApplication")
      data.append("cloud_name","dn2oxlhw7")
      fetch("https://api.cloudinary.com/v1_1/dn2oxlhw7/image/upload",{
        method:"post",
        body:data
      }).then((res)=>res.json())
      .then(data=>{
        setPics(data.url.toString())
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
    }
  }

  const submitFunc=(e)=>{
    e.preventDefault()
  }

  return (
    <>
    <form onSubmit={submitFunc}>
    <input type="text" placeholder='Name' onChange={(e)=>{setName(e.target.value)}}  />
    <input type="text" placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}  />
    <input type={show?"text":"password"} placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}  />
    <button className='' onClick={clickedFunc}>{show?"Hide":"Show"}</button>
    <input type="file" accept='image/*' onChange={(e)=>{pictureFunc(e.target.files[0])}} />
    </form>
    <button type='submit'>Sign In</button>
    </>
  )
}

export default Register