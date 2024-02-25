import { ChatState } from "../context/ChatProvider";

const UserList = ({ handleFunction }) => {
  const { user } = ChatState();

  return (
    <>
    <button onClick={handleFunction}>
      <img src={user.pic} alt={user.name} />
      <p>{user.name}</p>
      <b>Email : </b>
      {user.email}
    </button>
    </>
  );
};

export default UserList;
