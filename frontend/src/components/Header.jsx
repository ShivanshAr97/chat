import React from "react";

const Header = () => {
  return (
    <>
      <div className="flex border-b align-middle items-center">
        <img
          className="w-20 h-20"
          src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
          alt="logo"
        />

        <h1 className="font-bold text-2xl">ConvoStream</h1>
      </div>
    </>
  );
};

export default Header;
