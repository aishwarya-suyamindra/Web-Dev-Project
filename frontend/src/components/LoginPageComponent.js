import React, { useState } from 'react';
import axios from 'axios';
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
});

  const handleChange = (e) => {
    // Implement your login logic here
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // console.log('Login clicked:', { email, password });
    // Navigate('/home');
  };


  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/sign_in', credentials);
      alert('Login Successful');
      console.log(response);
      // Navigate('/home');
    } catch (error) {
      alert('Login failed!');
      console.log(error.response.data);
      console.log()
    }
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

