import React, { useState } from 'react';
import axios from 'axios';

const VideoUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('video', file);
      const data = JSON.stringify({
        title: "Title",
        description: "Test video"
      })
      formData.append('data', data)
      const response = await axios.post('http://localhost:3500/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Done:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="video/*" />
      <button onClick={handleUpload} disabled={!file}>
        Upload Video
      </button>
    </div>
  );
};

export default VideoUploader;
