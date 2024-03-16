import React, { useEffect, useState } from "react";
import {
  useGetCurrentUser,
  useGetRecentPosts,
  useGetSavedPost,
} from "../../lib/react-query/queriesAndMutations";
import PostCard from "../../components/shared/PostCard";
import { getSavedPost } from "../../lib/Appwrite/api";

const Saved = () => {
  //const { data: posts, isPending: isLoading } = useGetRecentPosts();
  const { data: currentUser, isLoading } = useGetCurrentUser();
  const posts = currentUser?.save?.map((ele)=>ele.post)
  
  //const { data: getSavedPost, isLoading } = useGetSavedPost();
  useEffect(()=>{},[currentUser])


  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
        <div className="w-full">
          <h2 className="text-left w-full">Saved Posts</h2>
          {isLoading && !posts ? (
            <>...Loading</>
          ) : (
            <ul className="flex flex-col gap-14">
              {posts.map((post, index) => (
                <PostCard key={index} post={post} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Saved;
