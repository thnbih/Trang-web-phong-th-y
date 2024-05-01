import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BoiBai52La.module.css';

function BoiBai52La() {
    const [flipped, setFlipped] = useState(true);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [summarizedMeaning, setSummarizedMeaning] = useState('');

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.post('http://localhost:5000/lat-bai-tay');
                setCards(response.data);
                console.log('cards loaded');
                console.log(response.data);
                summarizeCardMeanings(response.data);
            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        };

        fetchCards();
    }, []);

    const summarizeCardMeanings = async (cards) => {
        try {
            const response = await axios.post('http://localhost:3000/summarize', cards);
            const summarizedMeaning = response.data.summarizedMeaning;
            setSummarizedMeaning(summarizedMeaning);
            console.log('Summarized Meaning:', summarizedMeaning);
        } catch (error) {
            console.error('Error summarizing card meanings:', error);
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

    return (
        <>
            <div className={styles['Banner-Welcome']}>
                <h1 className={styles['Boi-Bai']}>Boi Bai 52 La</h1>
                <p className={styles['text-Boi-Bai']}>Tai day la noi boi bai 52 la linh thien</p>
            </div>
            <div className={styles['Boi-bai-area']}>
                <div className={styles['Card-area']}>
                    {cards.map((card, index) => (
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
                {summarizedMeaning && (
                    <div className={styles.summarizedMeaning}>
                        <h3>Summarized Meaning:</h3>
                        <p>{summarizedMeaning}</p>
                    </div>
                )}
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
        </>
    );
}

export default BoiBai52La;
