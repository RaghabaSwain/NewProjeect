import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//import { useGetPostById } from "../../lib/react-query/queriesAndMutations";

import { getPostById } from "../../lib/Appwrite/api";
import PostForm from "../../components/forms/PostForm";

const EditPost = () => {
  const { id } = useParams();

  
  
  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
        <div className="flex gap-2 w-full">
          <img src="/assets/icons/add-post.svg" alt="add-post" />
          <p className="">Edit Post</p>
        </div>
        
      </div>
    </div>
  );
};

export default EditPost;
