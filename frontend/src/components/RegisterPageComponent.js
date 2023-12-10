import React, { useState } from 'react';
import axios from 'axios';
import { login, logout } from '../Util/session';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setUserDetails, resetUser } from '../Util/LoginReducer.js'

const Register = () => {
  const BASE_REMOTE_URL = "http://localhost:3500"
  const [fullName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'fullName':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
      // Handle other cases if needed
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await axios.post(`${BASE_REMOTE_URL}/auth/register`, {
      fullName: fullName,
      email: email,
      password: password,
    }).then(response => {
      console.log(response);
      const userData = { ...response.data, name: fullName }
      login(userData)
      dispatch(setUserDetails(userData))
      navigate('/')
    }).catch(error => {
      alert('Registration failed: ' + error.response.data);
      console.log(error.response.data);
    })
  };

  return (
    <div className="container">
      <h2 className="mt-3">Register</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input type="text" className="form-control" name="fullName" value={fullName} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input type="email" className="form-control" name="email" value={email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input type="password" className="form-control" name="password" value={password} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;