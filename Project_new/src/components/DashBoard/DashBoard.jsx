import React from 'react';
import styles from './DashBoard.module.css'; 
import { Analytics } from '@vercel/analytics/react';


function DashBoard() {
    return (
        <div className={styles['BigDashBoard']}>
            <div className={styles['DashBoard1']}>
                <div className={styles['mini-container1']}>  
                    <h2>Lich am duong</h2>
                    <p>lich hom nay</p>              
                    <img alt="" className={styles['img']} src="https://cdn.sforum.vn/sforum/wp-content/uploads/2024/02/lich-am-thang-5-nam-2024-2.png" />
                </div>
                <div className={styles['content']}>
                    <p>Ngày:</p>
                </div>
            </div>

            <div className={styles['DashBoard2']}>
                <div className={styles['content']}>             
                    <p>Lá bài hôm nay:</p> <br/>
                    <p>Ý nghĩa:</p>
                </div>
                <div className={styles['mini-container1']}>                
                    <img alt="" className={styles['img']} src="https://static.overlay-tech.com/assets/12a3b79e-74fd-48a9-b263-11ac85421bd8.png" />
                    <h2>Hữu duyên tarot</h2>
                    <p>Quẻ tarot hữu duyên cho quý vị ghé thăm trang web</p> 
                </div>
            </div>

            <div className={styles['DashBoard3']}>
                <h2>Xem bói online</h2>
                <p className={styles['name-store']}>Trang web An nhiên cung cấp dịch vụ xem bói hữu duyên cho các anh chị</p>
                <div className={styles['button-store']}>
                    <p className={styles['text-button-store']}>Bat dau</p>
                </div>
            </div>

            <div className={styles['DashBoard4']}>
                <div>
                    <h1>Loi binh huu duyen</h1>
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
