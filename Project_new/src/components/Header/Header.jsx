import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { Helmet } from 'react-helmet';

function Header() {
  const [showNav, setShowNav] = useState(false);
  const navRef = useRef(null);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  const closeNav = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setShowNav(false);
    }
  };

  const handleLinkClick = () => {
    setShowNav(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setShowNav(false);
      }
    };

    if (showNav) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showNav]);

  return (
    <>
      {/* <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet> */}
      <div className={styles.header}>
        <div className={styles.Logo}>
          <img
            alt=""
            className={styles.logo}
            src="https://static.overlay-tech.com/assets/9b8f6e55-f5d0-42d0-b508-be81c2425e2f.png"
            width={40}
            height={35.56}
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

      <div
        className={`${styles.fullScreenNav} ${showNav ? styles.show : ''}`}
        onClick={closeNav}
      >
        <div ref={navRef} className={styles.navLinksContainer}>
          <Link to="/boi-bai-52-la" onClick={handleLinkClick}>
            Bói Bài 52 Lá
          </Link>
          <Link to="/boi-bai-tarot" onClick={handleLinkClick}>
            Bói Bài Tarot
          </Link>
          <Link to="/boi-ngay-sinh" onClick={handleLinkClick}>
            Bói Ngày Sinh
          </Link>
          <Link to="/livestream" onClick={handleLinkClick}>
            LiveStream
          </Link>
          <Link to="/tai-khoan" onClick={handleLinkClick}>
            Tài khoản
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;