import React from 'react'

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <button onClick={handleFunction}>
      {user.name}
      {admin === user._id && <span> (Admin)</span>}
    </button>
  );
};

export default UserBadgeItem;
