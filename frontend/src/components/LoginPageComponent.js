import React, { useState } from 'react';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
});

  const handleChange = () => {
    // Implement your login logic here
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // console.log('Login clicked:', { email, password });
    // Navigate('/home');
  };


  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/auth/sign_in', {credentials});
      alert('Login Successful');
      // Navigate('/home');
    } catch (error) {
      alert('Login failed!');
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
            id="email"
            value={email}
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
            id="password"
            value={password}
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
