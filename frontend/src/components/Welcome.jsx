import React, { useState, useEffect } from "react";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    (async () => {
      setUserName(
        await JSON.parse(
          localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)
        ).username
      );   
     })();
   
     }, [])

  return (
    <>
      <img src="" alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </>
  );
}
