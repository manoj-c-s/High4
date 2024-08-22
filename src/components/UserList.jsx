import React, { useContext } from "react";
import UserCard from "./UserCard";
import { UserContext } from "../context/UserContext";

const UserList = () => {
  const { users, isLoading, isError } = useContext(UserContext);

  // console.log(users)
  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Error loading users...</div>;

  return (
    <div className='container mx-auto mt-8'>
      <div className='flex flex-wrap justify-center'>
        {users
          ? users.map((user) => <UserCard key={user.owner_id} user={user} />)
          : null}
      </div>
    </div>
  );
};

export default UserList;
