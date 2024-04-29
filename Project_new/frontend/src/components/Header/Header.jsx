import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.Logo}>
          <img
            alt=""
            className={styles.logo}
            src="https://static.overlay-tech.com/assets/9b8f6e55-f5d0-42d0-b508-be81c2425e2f.png"
          />
          <Link className={styles.anNhien} to="/">
            An Nhiên
          </Link>
        </div>
        <button className={styles.navToggle} onClick={toggleNav}>
          Menu
        </button>
        <nav className={`${showNav ? styles.show : ''}`}>
          <Link to="/boi-bai-52-la">Bói Bài 52 Lá</Link>
          <Link to="/boi-bai-tarot">Bói Bài Tarot</Link>
          <Link to="/boi-ngay-sinh">Bói Ngày Sinh</Link>
          <Link to="/livestream">LiveStream</Link>
          <Link to="/tai-khoan">Tài khoản</Link>
        </nav>
      </div>

      <div className={`${styles.fullScreenNav} ${showNav ? styles.show : ''}`}>
        <button className={styles.closeButton} onClick={toggleNav}>X</button>
        <Link to="/boi-bai-52-la">Bói Bài 52 Lá</Link>
        <Link to="/boi-bai-tay">Bói Bài Tây</Link>
        <Link to="/boi-ngay-sinh">Bói Ngày Sinh</Link>
        <Link to="/livestream">LiveStream</Link>
        <Link to="/tai-khoan">Tài khoản</Link>
      </div>
    </>
  );
}

export default Header;
