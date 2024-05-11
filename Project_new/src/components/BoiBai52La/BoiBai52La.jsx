import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BoiBai52La.module.css';
import { Analytics } from '@vercel/analytics/react';
import { getAccessToken, getUser } from '../auth/auth';
import { ReadAloudButton } from '../readAloud/ReadAloudButton';
import { Helmet } from 'react-helmet';

function BoiBai52La() {
    const [flipped, setFlipped] = useState(true);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [summarizedMeaning, setSummarizedMeaning] = useState([]);
    const [cardsId, setCardsId] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const origin = window.location.origin;
                const accessToken = getAccessToken(origin);
                const userString = getUser(origin);
                const user = JSON.parse(userString)
                const userId = user._id;
                if (!accessToken) {
                    console.error('Access token not found');
                    return;
                }

                const headers = {
                    Authorization: `Bearer ${accessToken}`,
                };
                const requestBody = {
                    userId: userId,
                }
                const response = await axios.post('https://coiboicuchay-be.azurewebsites.net/api/lat-bai-tay', requestBody, { headers });
                const { cards, summarizedMeaning } = response.data;
                console.log(cards)
                if (cards && cards.length > 0) {
                    setCards(cards);
                    const cardsId = cards.map((card) => card._id);
                    const cardMeanings = cards.map((card) => card.Mean);
                    setCardsId(cardsId);
                    if (summarizedMeaning) {
                        setSummarizedMeaning(summarizedMeaning);
                    } else {
                        summarizeCardMeanings(cardMeanings, cardsId);
                    }
                } else {
                    setCards([]);
                    setSummarizedMeaning(summarizedMeaning || '');
                }
            } catch (error) {
                console.error('Error fetching cards:', error);
                setCards([]);
                setSummarizedMeaning('');
            }
        };

        fetchCards();
    }, []);

    const summarizeCardMeanings = async (cardMeanings, cardsId) => {
        try {
            // console.log(cardMeanings);
            const response = await axios.post('https://coiboicuchay-be.azurewebsites.net/api/summarize', cardMeanings);
            const summarizedMeaning = response.data.summarizedMeaning;
            setSummarizedMeaning(summarizedMeaning);
            saveApiResponse('lat-bai-tay', { cardsId, summarizedMeaning });
        } catch (error) {
            console.error('Error summarizing card meanings:', error);
        }
    };

    const saveApiResponse = async (type, result) => {
        try {
            const origin = window.location.origin;
            const accessToken = getAccessToken(origin);
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };

            const userString = getUser(origin);
            const user = JSON.parse(userString)
            const userId = user._id;
            const requestBody = {
                userId: userId,
                type,
                result: {
                    cardsId: result.cardsId,
                    summarizedMeaning: result.summarizedMeaning,
                },
            };

            await axios.post('https://coiboicuchay-be.azurewebsites.net/api/save-response', requestBody, { headers });
        } catch (error) {
            console.error('Error saving API response:', error);
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
            <Helmet>
                <title>Bói Bài Tây 52 Lá - Khám Phá Vận Mệnh Của Bạn</title>
                <meta name="description" content="Bói bài Tây 52 lá - trò tiêu khiển tưởng chừng đơn giản nhưng lại là cả một nghệ thuật đọc vị vận mệnh con người. Hãy thử rút vài lá bài và khám phá tương lai của bạn!" />
            </Helmet>
            <header className={styles['Banner-Welcome']}>
                <h1 className={styles['Boi-Bai']}>Bói bài Tây</h1>
                <p className={styles['text-Boi-Bai']}>Hướng dẫn: Suy nghĩ về một vấn đề bạn cần tham khảo, ấn vào nút lật bài, xem thông điệp từng lá bài bằng cách chọn vào lá bài mà bạn muốn. Ngoài ra, có thể xem tóm tắt bên dưới</p>
            </header>

            <main>
                <section className={styles['Boi-bai-area']}>
                    <div className={styles.buttonContainer}>
                        <button className={styles.Button} onClick={flipCard}>Lật Bài</button>
                    </div>
                    <div className={styles['Card-area']}>
                        {cards.length > 0 ? (
                            cards.map((card, index) => (
                                <div
                                    key={index}
                                    className={`${styles['Card']} ${flipped ? styles.flipped : ''}`}
                                    onClick={() => handleCardClick(card)}
                                >
                                    <img
                                        src={`data:image/webp;base64,${card.img}`}
                                        alt={card.Name}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>Loading cards...</p>
                        )}
                    </div>
                    {summarizedMeaning && (
                        <section className={styles.summarizedMeaning}>
                            <h2>Tóm tắt ý nghĩa</h2>
                            <div className={styles['result-item']}>
                                <div className={styles['result-label']}>Kết quả</div>
                                <ReadAloudButton text={summarizedMeaning} />
                                <div className={styles['result-value']}>{summarizedMeaning}</div>
                            </div>
                            <div className={styles['overall-message']}>
                                <h3>Lời nhắn</h3>
                                <p>Mỗi lá bài là một mảnh ghép trong bức tranh cuộc đời. Hãy kiên nhẫn ghép từng mảnh và chiêm ngưỡng bức tranh tổng thể về tương lai của bạn. Đừng bỏ lỡ cơ hội khám phá những điều kỳ diệu mà những lá bài Tây này mang lại!</p>
                            </div>
                        </section>
                    )}
                </section>
            </main>
            {selectedCard && (
                <div className={styles.fullscreen}>
                    <div className={styles.fullscreenContent}>
                        <img
                            src={`data:image/webp;base64,${selectedCard.img}`}
                            alt={selectedCard.Name}
                        />
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
