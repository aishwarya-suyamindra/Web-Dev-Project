import React, { useState } from 'react';
import { login } from '../Util/session';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { setUserDetails, resetUser } from '../Util/LoginReducer.js'

const Login = () => {
  const BASE_REMOTE_URL =  process.env.REACT_APP_API_BASE || "http://localhost:3500"
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role:''
});

const navigate = useNavigate();
const dispatch = useDispatch();

  const handleChange = (e) => {
    // Implement your login logic here
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // console.log('Login clicked:', { email, password });
    // Navigate('/home');
  };


  const handleLogin = async(e) => {
    e.preventDefault();
    await axios.post(`${BASE_REMOTE_URL}/auth/sign_in`, credentials)
    .then(response => {
      console.log("Logged in!")
      const userData = { ...response.data }
      console.log(userData)
      login(userData)
      dispatch(setUserDetails(userData))
      navigate('/')
    })
    .catch(error => {
      alert('Please register first!');
      console.log(error.response.data);
      console.log()
    })
  }




  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            value={credentials.email}
            onChange= {handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            value={credentials.password}
            onChange= {handleChange}
          />
          </div>
        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

