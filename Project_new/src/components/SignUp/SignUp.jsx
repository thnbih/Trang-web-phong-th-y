import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './SignUp.module.css';

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            // Send form data to server-side API
            const response = await axios.post('/api/register', {
                username: formData.username,
                password: formData.password
            });

            // Handle successful registration
            console.log(response.data);
        } catch (error) {
            // Handle registration error
            console.error(error);
        }

        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.label}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required/><br/><br/>

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required/><br/><br/>

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required/><br/><br/>

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required/><br/><br/>

            <input type="submit" value="Register"/>
            <Link to="/login">
                <button>Go to Login</button>
            </Link>
        </form>
    );
}

export default SignUp;
