import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setCookie } from './cookie';
import { Analytics } from '@vercel/analytics/react';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
  
      // Store user session information in localStorage or sessionStorage
      const origin = window.location.origin;
      localStorage.setItem(`${origin}_user`, JSON.stringify(response.data.data.user));
      localStorage.setItem(`${origin}_access_token`, response.data.data.access_token);
      localStorage.setItem(`${origin}_refresh_token`, response.data.data.refresh_token);

      navigate('/');
    } catch (error) {
      console.error(error.response.data.error);
      alert(JSON.stringify(error.response.data.error));
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <Link to='/signUp'>
            <button>Go to Signup</button>
        </Link>
      </form>
      <Analytics />
    </div>
  );
};

export default Login;