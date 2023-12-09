import React from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom';
import HomePageComponent from './HomePageComponent';
import RegitserPageComponent from './RegisterPageComponent';
import LoginPageComponent from './LoginPageComponent';

const VideoStreamApplication = () => {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomePageComponent />} />
          <Route path="/register" element={<RegitserPageComponent />} />
          <Route path="/login" element={<LoginPageComponent />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default VideoStreamApplication;
