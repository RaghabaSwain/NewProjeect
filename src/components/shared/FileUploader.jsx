import React, { useState } from "react";

const FileUploader = ({ formData, setFormData}) => {
  const [fileData, setFileData] = useState(false);
  
  const handleChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileData({
          uploadedFile,
          filePreview: event.target.result,
        });
      };
      reader.readAsDataURL(uploadedFile);
      setFormData({ ...formData, file:uploadedFile });
      
    } else {
      setFileData(false);
    }
  };

  const handleClick = () => {
    const fileInput = document.getElementById("file");
    fileInput.click();
  };

  const handleRemove =(e)=>{
    e.preventDefault();
    console.log(formData)
    setFileData(false)

  }
  return (
    <div className="flex flex-col gap-2 m-4">
      <label htmlFor="file">Add Photos</label>

      {fileData? (
        <div className="flex flex-col justify-center items-center">
          <img
            src={fileData.filePreview}
            alt="filePreview"
            className="rounded-xl p-2"
          />
          <button className="bg-rose-900 w-fit px-2 rounded-lg" onClick={handleRemove}>remove</button>
        </div>
      ) : (
        <div className="flex flex-col w-full justify-center items-center py-3 bg-gray-900 rounded-lg h-72">
          <img
            src="/assets/icons/file-upload.svg"
            alt="file-upload"
            height={100}
            width={100}
          />
          <button
            className="bg-gray-700 px-2  py-1 mt-5 rounded-lg"
            onClick={handleClick}
          >
            Select From Computer
          </button>
          <input
            type="file"
            name="file"
            id="file"
            className="hidden"
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default FileUploader;
