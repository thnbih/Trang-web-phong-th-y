import React from 'react';
import styles from './BoiBaiTarot.module.css'; 

function BoiBaiTarot() {
    return (
        <>
            <div className={styles['Banner-Welcome']}>
                <h1 className={styles['Boi-Bai-Tarot']}>Boi Bai Tarot</h1>
                <p className={styles['text-Boi-Bai-Tarot']}>Tai day la noi boi bai tarot linh thien</p>
            </div>
            <div className={styles['Boi-bai-area']}>
                <div className={styles['Card-are']}>
                    
                </div>
            </div>
        </>
    )
}
export default BoiBaiTarot;