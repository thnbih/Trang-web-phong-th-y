import React, { useState } from 'react';
// import styles from './SignUp.module.css'; // Đảm bảo rằng bạn đã định nghĩa styles cho SignUp

export const Account = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gửi dữ liệu form đến backend hoặc thực hiện các hành động khác
        console.log(formData);
    };

    return (
        <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required/><br/><br/>

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required/><br/><br/>

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required/><br/><br/>

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required/><br/><br/>

            <input type="submit" value="Register"/>
        </div>
    );
}
