import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPhoneCall, BiPowerOff } from "react-icons/bi";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";

export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };

  const handleCall = () => {
    const a = uuidv4();
    console.log(a);
    window.location.href = `http://localhost:3000`;
  };
  return (
    <div className="">
      <button onClick={handleCall}>
        <BiPhoneCall />
      </button>
      <button className="mx-4" onClick={handleClick}>
        <BiPowerOff />
      </button>
    </div>
  );
}
