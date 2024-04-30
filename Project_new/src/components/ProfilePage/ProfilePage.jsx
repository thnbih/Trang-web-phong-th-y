import React, { useState } from 'react';
import styles from './ProfilePage.module.css';
import { useNavigate } from 'react-router-dom'

function ProfilePage() {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/logout");
    }
    return (
        <>
            <div className={styles['ProfilePage']}>
                <div className={styles['profilepage-container']}>
                    <div className={styles['Header']}>
                        <div className={styles['Header-container']}>
                            <div className={styles['Header-title']}>
                                <h1>INFORMATION</h1>
                            </div>
                            <div className={styles['Change-button']}>
                                <button><b>Change</b></button>
                            </div>
                        </div>
                    </div>

                    <div className={styles['Body']}>
                        <div className={styles['body-container']}>
                            <div className={styles['container']}>
                                <div className={styles['text']}>
                                    <p>Username</p>
                                </div>
                                <div className={styles['input']}>
                                    <input type="text" cols="50" rows="3"></input>
                                </div>
                            </div>
                            <div className={styles['container']}>
                                <div className={styles['text']}>
                                    <p>Email</p>
                                </div>
                                <div className={styles['input']}>
                                    <input type="text" cols="50" rows="3"></input>
                                </div>
                            </div>
                            <div className={styles['container']}>
                                <div className={styles['text']}>
                                    <p>Fullname</p>
                                </div>
                                <div className={styles['input']}>
                                    <input type="text" cols="50" rows="3"></input>
                                </div>
                            </div>
                            <div className={styles['container']}>
                                <div className={styles['text']}>
                                    <p>Address</p>
                                </div>
                                <div className={styles['input']}>
                                    <input type="text" cols="50" rows="3"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['Footer']}>
                <div className={styles['Change-button']}>
                    <button onClick={handleLogout}><b>Logout</b></button>
                </div>
            </div>
        </>
    );
}
export default ProfilePage;