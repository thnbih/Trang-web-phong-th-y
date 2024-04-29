import React, { useState } from 'react';
import styles from './BoiBai52La.module.css';

function BoiBai52La() {
    const [flipped, setFlipped] = useState(true);

    const flipCard = () => {
        setFlipped(!flipped);
    };

    return (
        <>
            <div className={styles['Banner-Welcome']}>
                <h1 className={styles['Boi-Bai']}>Boi Bai 52 La</h1>
                <p className={styles['text-Boi-Bai']}>Tai day la noi boi bai 52 la linh thien</p>
            </div>
            <div className={styles['Boi-bai-area']}>
                <div className={styles['Card-area']}>
                    <div className={`${styles['Card']} ${flipped ? styles.flipped : ''}`}>
                        <img src='https://i.pinimg.com/236x/10/fb/39/10fb39ee5999ce9e05c4bb865fac9077.jpg' alt='Card'></img>
                    </div>
                    <div className={`${styles['Card']} ${flipped ? styles.flipped : ''}`}>
                        <img src='https://i.pinimg.com/236x/10/fb/39/10fb39ee5999ce9e05c4bb865fac9077.jpg' alt='Card'></img>
                    </div>
                    <div className={`${styles['Card']} ${flipped ? styles.flipped : ''}`}>
                        <img src='https://i.pinimg.com/236x/10/fb/39/10fb39ee5999ce9e05c4bb865fac9077.jpg' alt='Card'></img>
                    </div>
                    <div className={`${styles['Card']} ${flipped ? styles.flipped : ''}`}>
                        <img src='https://i.pinimg.com/236x/10/fb/39/10fb39ee5999ce9e05c4bb865fac9077.jpg' alt='Card'></img>
                    </div>
                    <div className={`${styles['Card']} ${flipped ? styles.flipped : ''}`}>
                        <img src='https://i.pinimg.com/236x/10/fb/39/10fb39ee5999ce9e05c4bb865fac9077.jpg' alt='Card'></img>
                    </div>
                </div>
                <p><button onClick={flipCard}>Lat Bai</button></p>
            </div>
        </>
    );
}

export default BoiBai52La;
