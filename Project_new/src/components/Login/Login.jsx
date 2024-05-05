import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Navigate, useNavigate } from "react-router-dom";
import { getCookie } from './cookie';
import Detail_Login  from './detail-login';
import { getUser } from '../auth/auth';

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
  const origin = window.location.origin;
  const user = getUser(origin);
  const token = getCookie("token");


  return (
    <>
      {token ? (
        <Navigate to="/profilepage" />
      ) : (
        <Detail_Login />
      )}
      <Analytics />
    </>
  );
};

export default Login;