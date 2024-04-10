import React from 'react';
import styles from './DashBoard.module.css'; 

function DashBoard() {
    return (
        <div className={styles['BigDashBoard']}>
            <div className={styles['DashBoard1']}>
                <div className={styles['mini-container1']}>  
                    <h2>Lich am duong</h2>
                    <p>lich hom nay</p>              
                    <img alt="" className={styles['img']} src="https://static.overlay-tech.com/assets/12a3b79e-74fd-48a9-b263-11ac85421bd8.png" />
                </div>

                <div className={styles['mini-container1']}>
                    <h2>Lich am duong</h2>
                    <p>lich hom nay</p>              
                    <img alt="" className={styles['img']} src="https://static.overlay-tech.com/assets/12a3b79e-74fd-48a9-b263-11ac85421bd8.png" />
                </div>

                <div className={styles['mini-container1']}>
                    <h2>Lich am duong</h2>
                    <p>lich hom nay</p>              
                    <img alt="" className={styles['img']} src="https://static.overlay-tech.com/assets/12a3b79e-74fd-48a9-b263-11ac85421bd8.png" />
                </div>
                
                <div className={styles['mini-container1']}>                
                    <h2>Lich am duong</h2>
                    <p>lich hom nay</p>              
                    <img alt="" className={styles['img']} src="https://static.overlay-tech.com/assets/12a3b79e-74fd-48a9-b263-11ac85421bd8.png" />
                </div>
            </div>

            <div className={styles['DashBoard2']}>
                <div className={styles['mini-container1']}>             
                    <img alt="" className={styles['img']} src="https://static.overlay-tech.com/assets/12a3b79e-74fd-48a9-b263-11ac85421bd8.png" />
                    <h2>Kết nói của tạo hóa</h2>
                    <p>meo meo</p>     
                </div>
                <div className={styles['mini-container1']}>                
                    <img alt="" className={styles['img']} src="https://static.overlay-tech.com/assets/12a3b79e-74fd-48a9-b263-11ac85421bd8.png" />
                    <h2>Thế giới khác</h2>
                    <p>something</p> 
                </div>
                <div className={styles['mini-container1']}>                
                    <img alt="" className={styles['img']} src="https://static.overlay-tech.com/assets/12a3b79e-74fd-48a9-b263-11ac85421bd8.png" />
                    <h2>Hãm tài</h2>
                    <p>something</p> 
                </div>
            </div>

            <div className={styles['DashBoard3']}>
                <h2>Cua hang</h2>
                <p className={styles['name-store']}>Navigating life’s intricate fabric, choices unfold
        paths to the extraordinary, demanding creativity,
        curiosity, and courage for a truly fulfilling
        journey.</p>
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

        </div>
    );
}

export default DashBoard;
