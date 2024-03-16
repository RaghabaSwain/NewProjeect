import React, { useEffect, useState } from "react";
import FileUploader from "../shared/FileUploader";
import { useUserContext } from "../../context/AuthContext";
import { useCreatePost } from "../../lib/react-query/queriesAndMutations";
import { useNavigate } from "react-router-dom";

const PostForm = () => {
  const { user } = useUserContext();
  const { mutateAsync: createPost } = useCreatePost();
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    creator: user.id,
    file: "",
    caption: "",
    location: "",
    tags: "",
  });

  const handleChange = (e) => {
    
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   const newPost =  await createPost(formData);
    if(newPost) navigate('/')

    //console.log(formData.file);
  };
  return (
    <form action="" className="w-full max-w-[800px]" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 m-4">
        <label htmlFor="caption">Caption</label>
        <input
          type="text"
          name="caption"
          id="caption"
          autoComplete="true"
          required
          className="h-20 rounded-lg bg-gray-900 pl-2"
          onChange={handleChange}
        />
      </div>
      <FileUploader formData={formData} setFormData={setFormData}/>
      <div className="flex flex-col gap-2 m-4">
        <label htmlFor="location">Add Location</label>
        <input
          type="text"
          name="location"
          id="location"
          autoComplete="true"
          required
          className="h-12 rounded-lg bg-gray-900 pl-2"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2 m-4">
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          name="tags"
          id="tags"
          autoComplete="true"
          required
          className="h-14 rounded-lg bg-gray-900 pl-2"
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end gap-2 mt-8">
        <button type="button" className="bg-rose-950 px-2 rounded-lg">
          Cancel
        </button>
        <button type="submit" className="bg-purple-600 px-2 rounded-lg">
          Submit
        </button>
      </div>
    </form>
  );
};

export default PostForm;
