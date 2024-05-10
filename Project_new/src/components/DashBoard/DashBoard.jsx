import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './DashBoard.module.css';
import { Analytics } from '@vercel/analytics/react';
import { ReadAloudButton } from '../readAloud/ReadAloudButton';
import { Helmet } from 'react-helmet';

function DashBoard() {
    //dashboard3
    const [tarotCards, setTarotCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [summarizedMeaning, setSummarizedMeaning] = useState('');
    const [showFullscreen, setShowFullscreen] = useState(false);

    useEffect(() => {
        const fetchTarotCards = async () => {
            try {
                const response = await axios.post('https://coiboicuchay-be.azurewebsites.net/api/lat-bai-tarot-dashboard');
                const { convertedCard } = response.data;
                console.log(response.data);
                const cardMeaning = convertedCard.Mean;
                // summarizeCardMeanings(cardMeaning);
                setTarotCards(convertedCard);
            } catch (error) {
                console.error('Error fetching Tarot cards:', error);
            }
        };

        fetchTarotCards();
    }, []);

    // const summarizeCardMeanings = async (cards) => {
    //     try {
    //         const response = await axios.post('https://coiboicuchay-be.azurewebsites.net/api/summarize', cards);
    //         const summarizedMeaning = response.data.summarizedMeaning;
    //         setSummarizedMeaning(summarizedMeaning);
    //     } catch (error) {
    //         console.error('Error summarizing card meanings:', error);
    //     }
    // };

    const handleCardClick = (card) => {
        setSummarizedMeaning(card.Mean);
        setShowFullscreen(true);
    };


    // dashboard4
    const [loiBinh, setLoiBinh] = useState([]);

    useEffect(() => {
        const fetchLoiBinh = async () => {
            try {
                const response = await axios.post('https://coiboicuchay-be.azurewebsites.net/api/loi-binh-dashboard');
                setLoiBinh(response.data);
            } catch (error) {
                console.error('Error fetching Loi Binh:', error);
            }
        };

        fetchLoiBinh();
    }, []);

    //calendar
    const [content, setContent] = useState('');

    useEffect(() => {
        // Lắng nghe sự kiện message từ window
        const handleMessage = (event) => {
            // Kiểm tra nếu là loại thông điệp mà chúng ta mong muốn
            if (event.data && event.data.type === 'showContent') {
                setContent(event.data.content);
            }
        };

        // Đăng ký lắng nghe sự kiện
        window.addEventListener('message', handleMessage);

        // Đảm bảo huỷ lắng nghe sự kiện khi component bị unmount
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);


    return (
        <>
            <Helmet>
                <title>An Nhiên - Coi Bói Cực Hay</title>
                <meta name="description" content="An Nhiên - Trang web tâm linh cung cấp dịch vụ xem bói hữu duyên, lịch âm dương, và nhiều hình thức coi bói khác để giúp bạn khám phá tương lai và tìm thấy chìa khóa cho những bí ẩn trong cuộc sống." />
            </Helmet>

            {/* <div className={styles['BigDashBoard']}> */}
            <header className={styles['Welcomebanner']}>
                <h1>Chào mừng bạn đến với An nhiên </h1>
                <h2>Trang web tâm linh thỏa mãn mọi mong cầu về tương lai của bạn</h2>
            </header>
            <main>
                <section className={styles['DashBoard1']}>
                    <div className={styles['mini-container1']}>
                        <h2>Lịch Âm Dương</h2>
                        <p>Lịch hôm nay</p>
                        <iframe src="/lich/index.html" width="100%" height="500px" frameBorder="0" title="Lịch Âm Dương"></iframe>
                    </div>
                    <div className={styles['content']}>
                        {content ? (
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        ) : (
                            <p>Chọn một ngày để xem thông tin chi tiết</p>
                        )}
                    </div>
                </section>

                <section className={styles['DashBoard2']}>
                    <div className={styles['Mean']}>
                        <h2>Hữu duyên tarot</h2>
                        <p>Quẻ tarot hữu duyên cho quý vị ghé thăm trang web</p>
                    </div>

                    <div className={styles['Card-area']}>
                        {tarotCards.map((card, index) => (
                            <div
                                key={index}
                                className={styles['Card']}
                                onClick={() => handleCardClick(card)}
                            >
                                <img
                                    src={`data:image/webp;base64,${card.img}`}
                                    alt={card.Name}
                                />
                            </div>
                        ))}
                    </div>

                </section>
                {showFullscreen && (
                    <div className={styles.fullscreen}>
                        <div className={styles.fullscreenContent}>
                            <div className={styles.summarizedMeaning}>
                                <h2>Tóm tắt ý nghĩa</h2>
                                <div className={styles['result-item']}>
                                    <div className={styles['result-label']}>Kết quả</div>
                                    <ReadAloudButton text={summarizedMeaning} />
                                    <div className={styles['result-value']}>{summarizedMeaning}</div>
                                </div>
                                <div className={styles['overall-message']}>
                                    <h3>Lời nhắn</h3>
                                    <p>Ồ, quẻ bài này có vẻ thú vị đây! Nhưng đừng dừng lại ở đó, hãy khám phá thêm những điều bất ngờ đang chờ đón bạn trong các loại hình coi bói khác mà chúng tôi cung cấp. Biết đâu, bạn sẽ tìm thấy chìa khóa cho những bí ẩn trong cuộc sống của mình!</p>
                                </div>
                            </div>
                            <button
                                className={styles.closeButton}
                                onClick={() => {
                                    setShowFullscreen(false);
                                }}
                            >
                                X
                            </button>
                        </div>
                    </div>
                )}


                <section className={styles['DashBoard3']}>
                    <h2>Xem bói online</h2>
                    <p className={styles['name-store']}>Trang web An nhiên cung cấp dịch vụ xem bói hữu duyên cho các anh chị</p>
                    <div className={styles['button-store']}>
                        <p className={styles['text-button-store']}>Bắt đầu</p>
                    </div>
                </section>

                <section className={styles['DashBoard4']}>
                    <div>
                        <h1>Lời bình hữu duyên</h1>
                    </div>
                    <div className={styles['comment']}>
                        {loiBinh.length > 0 && loiBinh.map((item, index) => (
                            <div key={index} className={styles['mini-container1']}>
                                <p>"{item.value}"</p>
                                <p>— {item.name}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
            <Analytics />
            {/* </div> */}
        </>
    );
}

export default DashBoard;