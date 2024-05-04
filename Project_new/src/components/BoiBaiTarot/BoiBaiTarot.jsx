import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BoiBaiTarot.module.css';
import { Analytics } from '@vercel/analytics/react';


function BoiBaiTarot() {
    const [flipped, setFlipped] = useState(true);
    const [tarotCards, setTarotCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [summarizedMeaning, setSummarizedMeaning] = useState('');

    // BoiBaiTarot.jsx
    useEffect(() => {
        const fetchTarotCards = async () => {
            try {
                const response = await axios.post('https://coiboicuchay-be.azurewebsites.net/api/lat-bai-tarot');
                summarizeCardMeanings(response.data);
            } catch (error) {
                console.error('Error fetching Tarot cards:', error);
            }
        };

        fetchTarotCards();
    }, []);

    const summarizeCardMeanings = async (cards) => {
        try {
            const response = await axios.post('https://coiboicuchay-be.azurewebsites.net/api/summarize', cards);
            const summarizedMeaning = response.data.summarizedMeaning;
            setSummarizedMeaning(summarizedMeaning);
            setTarotCards(cards); // Set the cards here
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

    const iframeRef = React.useRef(null);

    return (
        <>
            <div className={styles['Banner-Welcome']}>
                <h1 className={styles['Boi-Bai-Tarot']}>Bói bài Tarot</h1>
                <p className={styles['text-Boi-Bai-Tarot']}>Bói bài Tarot - môn nghệ thuật đọc vị tương lai qua những lá bài huyền bí.
                    Nếu bạn muốn biết số phận của mình trong tương lai gần, hãy thử rút một lá bài Tarot xem sao.
                    Nhưng xin lưu ý, nếu kết quả không như ý muốn, đừng vội buồn nhé, vì biết đâu bài nó "lẫy" bạn thôi!</p>
                <p className={styles['text-Boi-Bai-Tarot']}>Hướng dẫn: Suy nghĩ về một vấn đề bạn cần tham khảo, ấn vào nút lật bài, xem thông điệp từng lá bài bằng cách chọn vào lá bài mà bạn muốn. Ngoài ra, có thể xem tóm tắt bên dưới</p>

            </div>
            <div className={styles['Boi-bai-area']}>
                <div className={styles.buttonContainer}>
                    <button className={styles.Button} onClick={flipCard}>Lật Bài</button>
                </div>
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

export default BoiBaiTarot;
