import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './DashBoard.module.css';
import { Analytics } from '@vercel/analytics/react';


function DashBoard() {
    //dashboard3
    const [tarotCards, setTarotCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [summarizedMeaning, setSummarizedMeaning] = useState('');
    const [showFullscreen, setShowFullscreen] = useState(false);

    useEffect(() => {
        const fetchTarotCards = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/lat-bai-tarot-dashboard');
                summarizeCardMeanings(response.data);
            } catch (error) {
                console.error('Error fetching Tarot cards:', error);
            }
        };

        fetchTarotCards();
    }, []);

    const summarizeCardMeanings = async (cards) => {
        try {
            const response = await axios.post('http://localhost:5000/api/summarize', cards);
            const summarizedMeaning = response.data.summarizedMeaning;
            setSummarizedMeaning(summarizedMeaning);
            setTarotCards(cards);
        } catch (error) {
            console.error('Error summarizing card meanings:', error);
        }
    };

    const handleCardClick = (card) => {
        setSummarizedMeaning(card.Mean);
        setShowFullscreen(true);
    };


    // dashboard4
    const [loiBinh, setLoiBinh] = useState([]);

    useEffect(() => {
        const fetchLoiBinh = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/loi-binh-dashboard');
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
        <div className={styles['BigDashBoard']}>
            <div className={styles['Welcomebanner']}>
                <h1>Chào mừng bạn đến với An nhiên </h1>
                <h2>Trang web tâm linh thỏa mãn mọi mong cầu về tương lai của bạn</h2>
            </div>
            <div className={styles['DashBoard1']}>
                <div className={styles['mini-container1']}>
                    <h2>Lịch Âm Dương</h2>
                    <p>Lịch hôm nay</p>
                    <iframe src="src\components\DashBoard\lich\index.html" width="100%" height="500px" frameBorder="0" title="Lịch Âm Dương"></iframe>
                </div>
                <div className={styles['content']} dangerouslySetInnerHTML={{ __html: content }}>
                    {/* <p><strong>- Ngày Dương lịch:</strong> 06-05-2024 (Thứ hai)</p>
                    <p><strong>- Ngày Âm lịch:</strong> 28-03-2024 </p>
                    <p>- Tiết: <strong>Lập hạ</strong></p>
                    <p>- Ngày <strong>canh ngọ</strong> tháng <strong>mậu thìn</strong> năm <strong>giáp thìn</strong></p>
                    <p><strong>- Ngày trong tuần:</strong> Thứ 2</p>
                    <p>- Ngày <strong>Bạch Hổ Túc</strong>: cấm đi xa, làm việc gì cũng không thành công, rất xấu trong mọi việc</p>
                    <p>- Giờ <strong>Hoàng Đạo</strong>: Tý (23-1), Sửu (1-3), Mão (5-7), Ngọ (11-13), Thân (15-17), Dậu (17-19)</p> */}
                </div>
            </div>

            <div className={styles['DashBoard2']}>
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
                            <img src={card.img} alt={card.Name} />
                        </div>
                    ))}
                </div>

            </div>
            {showFullscreen && (
                <div className={styles.fullscreen}>
                    <div className={styles.fullscreenContent}>
                        <div className={styles.summarizedMeaning}>
                            <h2>Tóm tắt ý nghĩa</h2>
                            <div className={styles['result-item']}>
                                <div className={styles['result-label']}>Kết quả</div>
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


            <div className={styles['DashBoard3']}>
                <h2>Xem bói online</h2>
                <p className={styles['name-store']}>Trang web An nhiên cung cấp dịch vụ xem bói hữu duyên cho các anh chị</p>
                <div className={styles['button-store']}>
                    <p className={styles['text-button-store']}>Bắt đầu</p>
                </div>
            </div>

            <div className={styles['DashBoard4']}>
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
            </div>
            <Analytics />
        </div>
    );
}

export default DashBoard;