import React, { useState, useEffect } from "react";
import Landing from "../landing.png"

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
  }, []);

  return (
    <>
      <h1 className="flex flex-col -mt-12 mx-auto justify-center items-center h-screen gap-4 text-2xl">
        <img src={Landing} alt="" />
        <div>
          Welcome, <span>{userName}!</span>
        </div>
        <h3>Please select a chat to Start messaging.</h3>
      </h1>
    </>
  );
}
