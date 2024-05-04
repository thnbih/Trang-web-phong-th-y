import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './SignUp.module.css';
import { Analytics } from '@vercel/analytics/react';



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
        <form onSubmit={handleSubmit} className={styles.label}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={handleUsernameChange} required/><br/><br/>

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={handlePasswordChange} required/><br/><br/>

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} required/><br/><br/>

            <input type="submit" value="Register"/>
            <Link to="/login">
                <button>Go to Login</button>
            </Link>
            <Analytics />
        </form>
    );
}

export default SignUp;
