import React from 'react';
import styles from './Header.module.css'; 

function Header() {
    return (
        <>
        <div className={styles.header}>
            <div className={styles['Logo']}>
                <img alt="" className={styles.logo}src="https://static.overlay-tech.com/assets/9b8f6e55-f5d0-42d0-b508-be81c2425e2f.png"/>
                <a className={styles.anNhien} href='#'>An Nhiên</a>
            </div>
            <div className={styles['Menu']}>
                <a className={styles.dchV} href="#">Dịch vụ</a>
                <a className={styles.baiVitBlog} href='#'>Bài viết blog</a>
                <a className={styles.caHang} href='#'>Cửa hàng</a>
                <a className={styles.liveStream} href='#'>LiveStream</a>
                <a className={styles.dchV} href='#'>Liên hệ</a>
                <a className={styles.taiKhon} href='#'>Tài khoản</a>
            </div>
        </div>
        </>
    );
}

export default Header;
