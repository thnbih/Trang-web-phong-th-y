import React, { useState } from 'react';
import styles from './Header.module.css';

function Header({ onNavLinkClick }) {
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  const handleNavLinkClick = (componentName) => {
    onNavLinkClick(componentName);
    setShowNav(false);
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
          <a className={styles.anNhien} href="#" onClick={() => handleNavLinkClick('Dashboard')}>
            An Nhiên
          </a>
        </div>
        <button className={styles.navToggle} onClick={toggleNav}>
          Menu
        </button>
        <nav className={`${showNav ? styles.show : ''}`}>
          <a href="#" onClick={() => handleNavLinkClick('BoiBaiTarot')}>
            Dịch vụ
          </a>
          <a href="#" onClick={() => handleNavLinkClick('BaiVietBlog')}>
            Bài viết blog
          </a>
          <a href="#" onClick={() => handleNavLinkClick('Store')}>
            Cửa hàng
          </a>
          <a href="#" onClick={() => handleNavLinkClick('LiveStream')}>
            LiveStream
          </a>
          <a href="#" onClick={() => handleNavLinkClick('Contact')}>
            Liên hệ
          </a>
          <a href="#" onClick={() => handleNavLinkClick('Account')}>
            Tài khoản
          </a>
        </nav>
      </div>

      <div className={`${styles.fullScreenNav} ${showNav ? styles.show : ''}`}>
      <button className={styles.closeButton} onClick={toggleNav}>X</button>
        <a href="#" onClick={() => handleNavLinkClick('BoiBaiTarot')}>
          Dịch vụ
        </a>
        <a href="#" onClick={() => handleNavLinkClick('BaiVietBlog')}>
          Bài viết blog
        </a>
        <a href="#" onClick={() => handleNavLinkClick('Store')}>
          Cửa hàng
        </a>
        <a href="#" onClick={() => handleNavLinkClick('LiveStream')}>
          LiveStream
        </a>
        <a href="#" onClick={() => handleNavLinkClick('Contact')}>
          Liên hệ
        </a>
        <a href="#" onClick={() => handleNavLinkClick('Account')}>
          Tài khoản
        </a>
      </div>
    </>
  );
}

export default Header;
