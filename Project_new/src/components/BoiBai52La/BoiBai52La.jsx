import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BoiBai52La.module.css';
import { Analytics } from '@vercel/analytics/react';

function BoiBai52La() {
    const [flipped, setFlipped] = useState(true);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [summarizedMeaning, setSummarizedMeaning] = useState('');

    // BoiBai52La.jsx
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.post('https://coiboicuchay-be.azurewebsites.net/api/lat-bai-tay');
                summarizeCardMeanings(response.data);
            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        };

        fetchCards();
    }, []);

    const summarizeCardMeanings = async (cards) => {
        try {
            const response = await axios.post('https://coiboicuchay-be.azurewebsites.net/api/summarize', cards);
            const summarizedMeaning = response.data.summarizedMeaning;
            setSummarizedMeaning(summarizedMeaning);
            setCards(cards); // Set the cards here
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
                <h1 className={styles['Boi-Bai']}>Bói bài Tây</h1>
                <p className={styles['text-Boi-Bai']}>Bói bài Tây 52 lá - trò tiêu khiển tưởng chừng đơn giản nhưng lại là cả một nghệ thuật
                    đọc vị vận mệnh con người. Nếu bạn tò mò muốn biết tương lai của mình sẽ ra sao, hãy thử rút vài lá bài xem, biết đâu lại trúng giải độc đắc,
                    hoặc ít nhất cũng đỡ buồn ngủ lúc rảnh rỗi. Nhưng nhớ nha, kết quả chỉ mang tính chất tham khảo, đừng tin quá mà "đầu tư" hết cả vốn liếng đó!</p>
                
                <p className={styles['text-Boi-Bai']}>Hướng dẫn: Suy nghĩ về một vấn đề bạn cần tham khảo, ấn vào nút lật bài, xem thông điệp từng lá bài bằng cách chọn vào lá bài mà bạn muốn. Ngoài ra, có thể xem tóm tắt bên dưới</p>
            </div>
            <div className={styles['Boi-bai-area']}>
                <div className={styles.buttonContainer}>
                    <button className={styles.Button} onClick={flipCard}>Lật Bài</button>
                </div>
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
            <Analytics />
        </>
    );
}

export default BoiBai52La;
