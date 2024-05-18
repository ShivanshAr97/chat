import React, { useState, useEffect } from "react";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    (async () => {
      const data = await JSON.parse(
        localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    })();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <div className="h-[40rem] border w-[20rem]">
      {currentUserImage && currentUserImage && (
        <>
          <div className="h-[35.5rem]">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`flex items-center gap-4 border py-2 px-4 ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                    <img
                    className="w-16 rounded-full border border-black"
                      src={contact.avatarImage}
                      // src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                    <h3>{contact.username}</h3>
                </div>
              );
            })}
          </div>
          <div className="flex items-center px-4 py-2 gap-4 bg-blue-300">
            <img
              className="w-16 rounded-full border border-black"
              src={currentUserImage}
              // src={`data:image/svg+xml;base64,${currentUserImage}`}
              alt="avatar"
            />
              <h2>{currentUserName}</h2>
          </div>
        </>
      )}
    </div>
  );
}
