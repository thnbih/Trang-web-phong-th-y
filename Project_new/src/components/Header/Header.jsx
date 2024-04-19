import React, { useState } from 'react';
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
          <a className={styles.anNhien} href="#">
            An Nhiên
          </a>
        </div>
        <button className={styles.navToggle} onClick={toggleNav}>
          {showNav ? 'Hide Menu' : 'Show Menu'}
        </button>
        <nav className={`${showNav ? styles.show : ''}`}>
          <div className={styles.dropdown}>
            <a href="#">Dịch vụ</a>
            <div className={styles.dropdownContent}>
              <a href="#">Bói bài tây</a>
              <a href="#">Tarot</a>
              <a href="#">Xem ngày sinh</a>
            </div>
          </div>
          <a href="#">Bài viết blog</a>
          <a href="#">Cửa hàng</a>
          <a href="#">LiveStream</a>
          <a href="#">Liên hệ</a>
          <a href="#">Tài khoản</a>
        </nav>
      </div>
    </>
  );
}

export default Header;
