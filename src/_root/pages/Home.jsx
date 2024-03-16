import React from "react";
import { useGetRecentPosts } from "../../lib/react-query/queriesAndMutations";
import PostCard from "../../components/shared/PostCard";
import { useUserContext } from "../../context/AuthContext";

const Home = () => {
  const { data: posts, isPending: isLoading } = useGetRecentPosts();
  

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
        <div className="w-full">
          <h2 className="text-left w-full">Home feed</h2>
          {isLoading && !posts ? (
            <>...Loading</>
          ) : (
            <ul className="flex flex-col gap-14">
              {posts.map((post,index) =><PostCard key={index} post={post}/>)}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
