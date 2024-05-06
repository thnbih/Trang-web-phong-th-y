import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.NamePage}>
                <h1>An Nhiên</h1>
            </div>
            <div className={styles.Service}>
                <h3 className={styles.VatPham}>Dịch vụ</h3>
                <div className={styles.listProduct}>
                    <ul>
                        <li>
                            <Link to="/boi-bai-52-la">Bói bài tây</Link>
                        </li>
                        <li>
                            <Link to="/boi-bai-tarot">Tarot</Link>
                        </li>
                        <li>
                            <Link to="/boi-ngay-sinh">Xem ngày sinh</Link>
                        </li>
                        <li>
                            <Link to="/livestream">Livestream</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.Information}>
                <h3 className={styles.VatPham}>Thông tin</h3>
                <div className={styles.listProduct}>
                    <ul>
                        <li>Giới thiệu</li>
                        <li>Chính sách bảo mật</li>
                        <li>Điều khoản sử dụng</li>
                        <li>Liên hệ</li>
                    </ul>
                </div>
            </div>
            <div className={styles.Help}>                  
                <h3 className={styles.VatPham}>Trợ giúp</h3>
                <div className={styles.listProduct}>              
                    <ul>
                        <li>Hỏi đáp</li>
                        <li>Chăm sóc khách hàng</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;
