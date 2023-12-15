import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import "../stylesheets/VideoPlayer.css"

const VideoPlayer = ({id, isUploadedVideo}) => {
  console.log(id)
  console.log(isUploadedVideo)

  const BASE_REMOTE_URL =  process.env.REACT_APP_API_BASE || "http://localhost:3500"

  return (
    <>
      <div className="video-player-container mt-5">
        {isUploadedVideo ?
          <video src={`${BASE_REMOTE_URL}/video/${id}`} width="560" height="315" controls />
          :
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${id}`}
            allowFullScreen
          ></iframe>}
      </div>
      
    </>

  );
};

export default VideoPlayer;