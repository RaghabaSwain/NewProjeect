import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useUserContext } from "../../context/AuthContext";
import PostStats from "./PostStats";

const PostCard = ({ post }) => {
 
  const {user} = useUserContext()


  return (
    <div className="flex flex-col gap-2 rounded-lg max-w-screen-sm">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Link to={`/profile/${post?.creator?.id}`}>
            <img
              src={post?.creator?.imageUrl}
              alt="profile"
              className="rounded-full h-8 w-8"
            />
          </Link>
          <div className="flex flex-col justify-start items-start">
            <p className="text-slate-400">{post?.creator?.name}</p>
            <div className="flex gap-1">
              <p className="text-slate-600">{post.$createdAt}</p>
              <p className="text-slate-600">{post?.location}</p>
            </div>
          </div>
        </div>
        <Link to={`/edit-post/${post?.$id}`}>
          <img src="/assets/icons/edit.svg" alt="edit" className="w-6 h-6" />
        </Link>
      </div>
      <img
        src={post.imageUrl}
        alt=""
        className="m-2 rounded-lg object-fill"
        width={600}
        height={300}
      />
      <PostStats post={post} userId={user?.id}/>
     
    </div>
  );
};

export default PostCard;
