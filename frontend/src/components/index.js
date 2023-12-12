import React from 'react';
import { Route, Routes, HashRouter, Navigate } from 'react-router-dom';
import HomePageComponent from './HomePageComponent';
import RegitserPageComponent from './RegisterPageComponent';
import LoginPageComponent from './LoginPageComponent';
import VideoDetails from './DetailsComponent';
import store from '../Util/store';
import { Provider } from 'react-redux';

const VideoStreamApplication = () => {
  return (
    <Provider store={store}>
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="/home" element={<HomePageComponent/>} />
          <Route path="/register" element={<RegitserPageComponent />} />
          <Route path="/login" element={<LoginPageComponent />} />
          <Route path='/video/:id' element={<VideoDetails/>}/>
        </Routes>
      </div>
    </HashRouter>
    </Provider>
  );
};

export default VideoStreamApplication;
