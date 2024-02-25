import { ChatState } from "../../Context/ChatProvider";

const UserListItem = ({ handleFunction }) => {
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
