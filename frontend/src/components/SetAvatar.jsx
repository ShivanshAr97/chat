import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
import { IoReload } from "react-icons/io5";
import Loader from "./Loader";

export default function SetAvatar() {
  const api = `https://robohash.org`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY))
        navigate("/login");
    })();
  }, []);

  const refresh=()=>{
    window.location.reload();
  }

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          import.meta.env.VITE_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 10000)}`
        );
        data.push(image.config.url)
        console.log(image.config.url);
      }
      setAvatars(data);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="text-2xl my-8 mx-4 flex justify-between">
            <h1>Pick an Avatar as your profile picture</h1>
            <button onClick={refresh}><IoReload /></button>
          </div>
          <div className="avatars flex gap-4 m-4">
            {avatars.map((avatar, index) => {
              return (
                <div key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                  className="w-52 border rounded-full cursor-pointer"
                    src={`${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="border mx-auto w-fit px-4 py-2 flex my-8 text-white bg-green-500 rounded-md">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </>
      )}
    </>
  );
}
