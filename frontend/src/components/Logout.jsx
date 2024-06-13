import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPhoneCall, BiPowerOff } from "react-icons/bi";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";


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

  return (
    <div className="">
      <button className="mx-4" onClick={handleClick}>
        <BiPowerOff size={24}/>
      </button>
    </div>
  );
}
