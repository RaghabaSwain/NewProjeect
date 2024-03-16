import React from "react";
import { useGetAllUsers } from "../../lib/react-query/queriesAndMutations";

const AllUsers = () => {
  const { data: users } = useGetAllUsers();
  if(!users)return <>Loading...</>
  return (
    <div className="flex flex-wrap gap-3 m-8 justify-start items-start">
      {users.map((user) => (
        <div className="flex flex-col justify-center items-center gap-1 bg-gray-600 rounded-lg m-5 p-3">
          <img
            src={user.imageUrl}
            alt=""
            className="rounded-full"
            width={50}
            height={50}
          />
          <h1 className="py-0">{user.name}</h1>
          <h1 className="py-0 text-center text-slate-400">@{user.username}</h1>
        </div>
      ))}
    </div>
  );
};

export default AllUsers;
