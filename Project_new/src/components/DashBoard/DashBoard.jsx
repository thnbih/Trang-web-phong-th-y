import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './DashBoard.module.css'; 
import { Analytics } from '@vercel/analytics/react';


function DashBoard() {
    const [tarotCards, setTarotCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [summarizedMeaning, setSummarizedMeaning] = useState('');

    useEffect(() => {
        const fetchTarotCards = async () => {
            try {
                const response = await axios.post('https://coiboicuchay-be.azurewebsites.net/api/lat-bai-tarot-dashboard');
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

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const closeFullscreen = () => {
        setSelectedCard(null);
    };

    return (
        <div className={styles['BigDashBoard']}>
            <div className={styles['Welcomebanner']}>
                <h1>Chào mừng bạn đến với An nhiên </h1>
                <h2>Trang web tâm linh thỏa mãn mọi mong cầu về tương lai của bạn</h2>
            </div>
            <div className={styles['DashBoard1']}>
                <div className={styles['mini-container1']}>  
                    <h2>Lịch Âm Dương</h2>
                    <p>Lịch hôm nay</p>              
                    <img alt="" className={styles['img']} src="https://cdn.sforum.vn/sforum/wp-content/uploads/2024/02/lich-am-thang-5-nam-2024-2.png" />
                </div>
                <div className={styles['content']}>
                    <p><strong>- Ngày Dương lịch:</strong> 06-05-2024 (Thứ hai)</p>
                    <p><strong>- Ngày Âm lịch:</strong> 28-03-2024 </p>
                    <p>- Tiết: <strong>Lập hạ</strong></p>
                    <p>- Ngày <strong>canh ngọ</strong> tháng <strong>mậu thìn</strong> năm <strong>giáp thìn</strong></p>
                    <p><strong>- Ngày trong tuần:</strong> Thứ 2</p>
                    <p>- Ngày <strong>Bạch Hổ Túc</strong>: cấm đi xa, làm việc gì cũng không thành công, rất xấu trong mọi việc</p>
                    <p>- Giờ <strong>Hoàng Đạo</strong>: Tý (23-1), Sửu (1-3), Mão (5-7), Ngọ (11-13), Thân (15-17), Dậu (17-19)</p>
                </div>
            </div>

            <div className={styles['DashBoard2']}>
                <div className={styles['Mean']}>
                    {summarizedMeaning && (
                        <div className={styles.summarizedMeaning}>
                            <h3>Ý nghĩa lá bài:</h3>
                            <p>{summarizedMeaning}</p>
                        </div>
                    )}
                </div>

                <div className={styles['Card-area']}>
                    {tarotCards.map((card, index) => (
                        <div
                            key={index}
                            className={styles['Card']}
                            onClick={() => handleCardClick(card)}
                        >
                            <img src={card.img} alt={card.Name} />
                        </div>
                    ))}
                    <h2>Hữu duyên tarot</h2>
                    <p>Quẻ tarot hữu duyên cho quý vị ghé thăm trang web</p> 
                </div>

                {/* <div className={styles['content']}>             
                    <h2>Lá bài hôm nay:</h2>
                    <p>Ý nghĩa:</p>
                </div>
                <div className={styles['mini-container1']}>                
                    <img alt="" className={styles['img']} src="https://static.overlay-tech.com/assets/12a3b79e-74fd-48a9-b263-11ac85421bd8.png" />
                    <h2>Hữu duyên tarot</h2>
                    <p>Quẻ tarot hữu duyên cho quý vị ghé thăm trang web</p> 
                </div> */}
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

            <div className={styles['DashBoard3']}>
                <h2>Xem bói online</h2>
                <p className={styles['name-store']}>Trang web An nhiên cung cấp dịch vụ xem bói hữu duyên cho các anh chị</p>
                <div className={styles['button-store']}>
                    <p className={styles['text-button-store']}>Bat dau</p>
                </div>
            </div>

            <div className={styles['DashBoard4']}>
                <div>
                    <h1>Lời bình hữu duyên</h1>
                </div>
                <div className={styles['comment']}>
                    <div className={styles['mini-container1']}>  
                        <p>Trang web hay qua</p>
                        <p>Kien</p>              
                    </div>

                    <div className={styles['mini-container1']}>
                        <p>Trang web hay qua</p>
                        <p>Kien</p>        
                    </div>

                    <div className={styles['mini-container1']}>
                        <p>Trang web hay qua</p>
                        <p>Kien</p>         
                    </div>
                </div>
            </div>
            <Analytics />
        </div>
    );
}

export default DashBoard;

// const elDB1 = document.getElementById("dashboard1")

// function isIntoView(el){
//  const rect = el.getBoundingClientRect();
//  return rect.bottom <= window.innerHeight;
// }

// isIntoView(elDB1);
// window.addEventListener("scroll", () => {
//     if(isIntoView(elDB1)){
//         elDB1.classList.add("active")
//     }
// });