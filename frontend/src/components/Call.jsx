import React from "react";
import { BiPhoneCall, BiPowerOff } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";

const Call = () => {
  const handleCall = () => {
    const a = uuidv4();
    console.log(a);
    window.location.href = `http://localhost:3000`;
  };
  return (
    <button className="mx-2" onClick={handleCall}>
      <BiPhoneCall size={24} />
    </button>
  );
};

export default Call;
