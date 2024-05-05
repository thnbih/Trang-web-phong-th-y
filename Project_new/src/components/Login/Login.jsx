import React, { useState } from 'react';
import styles from './Login.module.css';
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
      // Send the login request to the backend
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      // Handle successful login
      console.log(response.data.message);
      alert(JSON.stringify(response.data.message));

      // set cookie
      const time = 1;
      setCookie("id", response.data.data.user._id, time);
      setCookie("username", response.data.data.user.username, time);
      setCookie("token", response.data.data.access_token, time);

      navigate('/');
    } catch (error) {
      // Handle login error
      console.error(error.response.data.error);
      alert(JSON.stringify(error.response.data.error));
    }
  };

  return (
    <div className={styles['container']}>
      <form onSubmit={handleSubmit}>
        <div className={styles['title-container']}>
          <h1>Login</h1>
        </div>
        <div className={styles['input-container']}>
          <div className={styles['content-container']}>
            <div className={styles['content-text']}>
              <p>Username: </p>
            </div>
            <div className={styles['content-input']}>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </div>
          </div>
          <div className={styles['content-container']}>
            <div className={styles['content-text']}>
              <p>Password: </p>
            </div>
            <div className={styles['content-input']}>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
          </div>
        </div>
        {/* <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div> */}
        {/* <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div> */}
        <div className={styles['button-container']}>
          <div className={styles['item-button']}>
            <button type="submit">Login</button>
          </div>
          <div className={styles['item-button']}>
            <Link to='/signUp'>
              <button>Go to Signup</button>
            </Link>
          </div>
        </div>
      </form>
      <Analytics />
    </div>
  );
};

export default Login;