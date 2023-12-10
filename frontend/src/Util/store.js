import { combineReducers } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import { sessionService } from 'redux-react-session';
import { sessionReducer } from 'redux-react-session';
import LoginReducer from './LoginReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  login: LoginReducer
});

const store = configureStore({reducer: rootReducer});

const options = { refreshOnCheckAuth: true, redirectPath: '/home', driver: 'COOKIES'};
sessionService.initSessionService(store, options)

export default store;
