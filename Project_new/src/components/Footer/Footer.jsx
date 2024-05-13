import React from 'react';
import { FacebookOutlined, InstagramOutlined, YoutubeOutlined, TwitterOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Footer() {
    const handleFacebookClick = () => {
        window.open('https://facebook.com', '_blank');
    };

    const handleInstagramClick = () => {
        window.open('https://instagram.com', '_blank');
    };

    const handleYoutubeClick = () => {
        window.open('https://youtube.com', '_blank');
    };

    const handleTwitterClick = () => {
        window.open('https://twitter.com', '_blank');
    };

    return (
        <>
            <div className={styles['footer-container']}>
                <div className={styles['footer-item']}>
                    <div className={styles['identity-container']}>
                        <div className={styles['logo-container']}>
                            <img src="page-logo.webp" alt="logo" width={90} height={88.5} />
                        </div>
                        <div className={styles['name-container']}>
                            <p>AN NHIÊN</p>
                            <div className={styles['slogan-container']}>
                                <p>An nhiên về tương lai của bạn</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['footer-item']}>
                    <div className={styles['service-container']}>
                        <div className={styles['service-title']}>
                            <p>DỊCH VỤ</p>
                        </div>
                        <div className={styles['service-item-container']}>
                            <div className={styles['service-item']}>
                                <div className={styles['service-text']}>
                                    <Link to="/boi-bai-52-la"><p>Bói bài Tây</p></Link>
                                </div>
                                <div className={styles['service-text']}>
                                    <Link to="/boi-bai-tarot"><p>Bói bài Tarot</p></Link>
                                </div>
                            </div>
                            <div className={styles['service-item']}>
                                <div className={styles['service-text']}>
                                    <Link to="/boi-ngay-sinh"><p>Bói ngày sinh</p></Link>
                                </div>
                                <div className={styles['service-text']}>
                                    <Link to="/livestream"><p>Livestream</p></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['social-container']}>
                        <div className={styles['social-title']}>
                            <p>LIÊN HỆ</p>
                        </div>
                        <div className={styles['social-item-container']}>
                            <div className={styles['social-item']}>
                                <Tooltip title="Facebook">
                                    <span onClick={handleFacebookClick}>
                                        <FacebookOutlined style={{ fontSize: '50px', color: '#FAACA8', marginRight: '10px', cursor: 'pointer' }} />
                                    </span>
                                </Tooltip>
                            </div>
                            <div className={styles['social-item']}>
                                <Tooltip title="Instagram">
                                    <span onClick={handleInstagramClick}>
                                        <InstagramOutlined style={{ fontSize: '50px', color: '#FAACA8', marginRight: '10px', cursor: 'pointer' }} />
                                    </span>
                                </Tooltip>
                            </div>
                            <div className={styles['social-item']}>
                                <Tooltip title="YouTube">
                                    <span onClick={handleYoutubeClick}>
                                        <YoutubeOutlined style={{ fontSize: '50px', color: '#FAACA8', marginRight: '10px', cursor: 'pointer' }} />
                                    </span>
                                </Tooltip>
                            </div>
                            <div className={styles['social-item']}>
                                <Tooltip title="Twitter">
                                    <span onClick={handleTwitterClick}>
                                        <TwitterOutlined style={{ fontSize: '50px', color: '#FAACA8', marginRight: '10px', cursor: 'pointer' }} />
                                    </span>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;