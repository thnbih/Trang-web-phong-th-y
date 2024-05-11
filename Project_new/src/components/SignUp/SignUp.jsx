import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './SignUp.module.css';
import { Analytics } from '@vercel/analytics/react';
import { Helmet } from 'react-helmet';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // Send form data to server-side API
      const response = await axios.post('https://coiboicuchay-be.azurewebsites.net/api/register', {
        username,
        password
      });

      // Handle successful registration
      console.log(response.data);

      alert(JSON.stringify(response.data.message));

      navigate('/login');
    } catch (error) {
      // Handle registration error
      console.error(error);
      alert(JSON.stringify(error.response.data));
    }
  };

  return (
    <main>
      <Helmet>
        <title>Đăng Ký</title>
        <meta name="description" content="Đăng ký tài khoản mới để truy cập các tính năng và dịch vụ của chúng tôi." />
      </Helmet>
      <form onSubmit={handleSubmit} className={styles.label}>
        <div className={styles['container']}>
          <div className={styles['title-container']}>
            <p>Register</p>
          </div>
          <div className={styles['input-container']}>
            <div className={styles['content-container']}>
              <div className={styles['content-text']}>
                <label htmlFor="username">Username:</label>
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
          </div>
          <div className={styles['input-container']}>
            <div className={styles['content-container']}>
              <div className={styles['content-text']}>
                <label htmlFor="password">Password:</label>
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
          <div className={styles['input-container']}>
            <div className={styles['content-container']}>
              <div className={styles['content-text']}>
                <label htmlFor="confirmPassword">Confirm Password:</label>
              </div>
              <div className={styles['content-input']}>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className={styles['button-container']}>
            <div className={styles['item-button']}>
              <button type="submit">Register</button>
            </div>
            <div className={styles['item-button']}>
              <Link to="/login">
                <button>Go to Login</button>
              </Link>
            </div>
          </div>
          <Analytics />
        </div>
      </form>
    </main>
  );
}

export default SignUp;