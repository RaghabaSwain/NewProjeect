import React, { useEffect, useState } from "react";
import {
  useDeleteSavePost,
  useGetCurrentUser,
  useSavePost,
} from "../../lib/react-query/queriesAndMutations";
import { deleteSavePost, likePost, savePost } from "../../lib/Appwrite/api";

const PostStats = ({ post, userId }) => {
  const likesList = post?.likes?.map((user) => user?.$id);
  const { data: currentUser } = useGetCurrentUser();
  let savedPost = currentUser?.save?.find(
    (record) => record?.post?.$id == post?.$id
  );
   

  useEffect(() => {
    setIsSaved(savedPost ? true : false);
  }, [currentUser]);


  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(savedPost ? true : false);

  //const { mutate: savePost, isPending: isSaving } = useSavePost();
  //const { mutate: deleteSavePost, isPending: isDeleting } = useDeleteSavePost();

  const handleLike = () => {
    let newLikes = [...likes];
    if (newLikes.includes(userId)) {
      newLikes = newLikes.filter((id) => id != userId);
    } else {
      newLikes.push(userId);
    }
    likePost(post.$id, newLikes);
    setLikes(newLikes);
  };

  const handleSave = () => {
    console.log("savedPost",savedPost)
    if (isSaved) {
      deleteSavePost(savedPost?.$id);
      console.log("delete");
      
    } else {
      savePost(post?.$id, currentUser?.$id);
      console.log("save");
      
    }
    setIsSaved(isSaved=>!isSaved);
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={
            likes?.includes(userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          alt="like"
          width={20}
          height={20}
          onClick={handleLike}
          className="cursor-pointer"
        />
        <p>{likes?.length}</p>
      </div>
      <div className="flex gap-2">
        { false? (
          <>Loading...</>
        ) : (
          <img
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt="save"
            width={20}
            height={20}
            onClick={handleSave}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
