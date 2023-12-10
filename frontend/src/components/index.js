import React from 'react';
import { Route, Routes, HashRouter, Navigate } from 'react-router-dom';
import HomePageComponent from './HomePageComponent';
import RegitserPageComponent from './RegisterPageComponent';
import LoginPageComponent from './LoginPageComponent';
import VideoPlayer from './VideoPlayer';

const VideoStreamApplication = () => {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="/home" element={<HomePageComponent/>} />
          <Route path="/register" element={<RegitserPageComponent />} />
          <Route path="/login" element={<LoginPageComponent />} />
          <Route path='/video/:id' element={<VideoPlayer/>}/>
        </Routes>
      </div>
    </HashRouter>
  );
};

export default VideoStreamApplication;
