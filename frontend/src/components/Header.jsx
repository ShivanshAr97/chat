import React from "react";
import Logo from "../logo.png";
import Logout from "./Logout";

const Header = () => {
  return (
    <>
      <div className="flex justify-between border-b py-1 align-middle items-center">
        <div className="flex align-middle items-center">
          <img className="w-72 h-20" src={Logo} alt="logo" />
        </div>

        <Logout />
      </div>
    </>
  );
};

export default Header;
