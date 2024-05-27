import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BoiBaiTarot.module.css';
import { Analytics } from '@vercel/analytics/react';
import { getAccessToken, getUser } from '../auth/auth';
import { ReadAloudButton } from '../readAloud/ReadAloudButton';
import { Helmet } from 'react-helmet';
import { message } from 'antd';


function BoiBaiTarot() {
    const [flipped, setFlipped] = useState(true);
    const [tarotCards, setTarotCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [summarizedMeaning, setSummarizedMeaning] = useState('');
    const [cardsId, setCardsId] = useState([]);

    useEffect(() => {
        const fetchTarotCards = async () => {
            try {
                const origin = window.location.origin;
                const accessToken = getAccessToken(origin);
                const userString = getUser(origin);
                const user = JSON.parse(userString);
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
                };

                const response = await axios.post('https://coiboicuchay-be.azurewebsites.net/api/lat-bai-tarot', requestBody, { headers });
                const { tarotCards, summarizedMeaning } = response.data;
                console.log(tarotCards);
                if (tarotCards && tarotCards.length > 0) {
                    setTarotCards(tarotCards);
                    const cardsId = tarotCards.map((tarotCard) => tarotCard._id);
                    const cardMeanings = tarotCards.map((tarotCard) => tarotCard.Mean);
                    setCardsId(cardsId);
                    if (summarizedMeaning) {
                        setSummarizedMeaning(summarizedMeaning);
                    } else {
                        summarizeCardMeanings(cardMeanings, cardsId);
                    }
                } else {
                    setTarotCards([]);
                    setSummarizedMeaning(summarizedMeaning || '');
                }
            } catch (error) {
                console.error('Error fetching Tarot cards:', error);
                message.error("Login or Signup to view cards");
                setTarotCards([]);
                setSummarizedMeaning('');
            }
        };

        fetchTarotCards();
    }, []);

    const summarizeCardMeanings = async (cardMeanings, cardsId) => {
        try {
            const response = await axios.post('https://coiboicuchay-be.azurewebsites.net/api/summarize', cardMeanings);
            const summarizedMeaning = response.data.summarizedMeaning;
            setSummarizedMeaning(summarizedMeaning);
            saveApiResponse('lat-bai-tarot', { cardsId, summarizedMeaning });
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
            const user = JSON.parse(userString);
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
                <title>Bói Bài Tarot - Khám Phá Tương Lai Qua Lá Bài Huyền Bí</title>
                <meta name="description" content="Bói bài Tarot - môn nghệ thuật đọc vị tương lai qua những lá bài huyền bí. Nếu bạn muốn biết số phận của mình trong tương lai gần, hãy thử một quẻ bài Tarot xem sao." />
            </Helmet>
            <header className={styles['Banner-Welcome']}>
                <h1 className={styles['Boi-Bai-Tarot']}>Bói bài Tarot</h1>
                <p className={styles['text-Boi-Bai-Tarot']}>Hướng dẫn: Suy nghĩ về một vấn đề bạn cần tham khảo, ấn vào nút lật bài, xem thông điệp từng lá bài bằng cách chọn vào lá bài mà bạn muốn. Ngoài ra, có thể xem tóm tắt bên dưới</p>

            </header>

            <main>
                <section className={styles['Boi-bai-area']}>
                    <div className={styles.buttonContainer}>
                        <button className={styles.Button} onClick={flipCard}>Lật Bài</button>
                    </div>
                    <div className={styles['Card-area']}>
                        {tarotCards.length > 0 ? (
                            tarotCards.map((card, index) => (
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
                        <div className={styles.summarizedMeaning}>
                            <h2>Tóm tắt ý nghĩa</h2>
                            <div className={styles['result-item']}>
                                <div className={styles['result-label']}>Kết quả</div>
                                <ReadAloudButton text={summarizedMeaning} />
                                <div className={styles['result-value']}>{summarizedMeaning}</div>
                            </div>
                            <div className={styles['overall-message']}>
                                <h3>Lời nhắn</h3>
                                <p>Ồ, những lá bài Tarot này hé lộ một khía cạnh thú vị trong tâm hồn bạn đấy! Nhưng đó chỉ là khởi đầu thôi. Hãy đào sâu hơn vào trí tuệ cổ xưa của Tarot và khám phá những bí mật còn ẩn giấu. Biết đâu, bạn sẽ tìm thấy con đường dẫn đến sự thấu hiểu bản thân và thế giới xung quanh!</p>
                            </div>
                        </div>
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
                            <ReadAloudButton text={selectedCard.Mean} />
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
