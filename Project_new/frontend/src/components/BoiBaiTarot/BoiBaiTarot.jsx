// BoiBaiTarot.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BoiBaiTarot.module.css';

function BoiBaiTarot() {
    const [flipped, setFlipped] = useState(true);
    const [tarotCards, setTarotCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        fetchTarotCards();
    }, []);

    const fetchTarotCards = async () => {
        try {
            const response = await axios.post('http://localhost:5000/lat-bai-tarot');
            setTarotCards(response.data);
            if (iframeRef.current) {
                iframeRef.current.contentWindow.postMessage(response.data, '*');
            }
        } catch (error) {
            console.error('Error fetching Tarot cards:', error);
        }
    };

    const flipCard = () => {
        setFlipped(!flipped);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const closeFullscreen = () => {
        setSelectedCard(null);
    };

    const iframeRef = React.useRef(null);

    return (
        <>
            <div className={styles['Banner-Welcome']}>
                <h1 className={styles['Boi-Bai-Tarot']}>Boi Bai Tarot</h1>
                <p className={styles['text-Boi-Bai-Tarot']}>Tai day la noi boi bai tarot linh thien</p>
            </div>
            <div className={styles['Boi-bai-area']}>
                <div className={styles['Card-area']}>
                    {tarotCards.map((card, index) => (
                        <div
                            key={index}
                            className={`${styles['Card']} ${flipped ? styles.flipped : ''}`}
                            onClick={() => handleCardClick(card)}
                        >
                            <img src={card.img} alt={card.Name} />
                        </div>
                    ))}
                </div>
                <p><button onClick={flipCard}>Lat Bai</button></p>
            </div>
            {selectedCard && (
                <div className={styles.fullscreen}>
                    <div className={styles.fullscreenContent}>
                        <img src={selectedCard.img} alt={selectedCard.Name} />
                        <div className={styles.cardMeaning}>
                            <h2>{selectedCard.Name}</h2>
                            <p>{selectedCard.Mean}</p>
                        </div>
                        <button className={styles.closeButton} onClick={closeFullscreen}>
                            X
                        </button>
                    </div>
                </div>
            )}
            <iframe
                ref={iframeRef}
                src="https://www.chatbase.co/chatbot-iframe/u8obNYlMMuzFeEr1Gt1eg"
                title="Chatbot"
                width="100%"
                style={{ height: '100%', minHeight: '700px' }}
                frameBorder="0"
            />
        </>
    );
}

export default BoiBaiTarot;
