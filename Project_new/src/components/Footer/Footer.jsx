import React from 'react';
import styles from './Footer.module.css'; 

function Footer(){
    return(
        <>
            <div className={styles['footer']}>
                <div className={styles['Name-page']}>                  
                    <h3>An Nhiên</h3>
                </div>
                <div className={styles['Product']}> 
                    <h3 ClassName={styles['VatPham']}>Vật phẩm phong thủy</h3>
                    <div className={styles['listProduct']}>              
                        <ul>
                            <li>Vòng ngọc phong thủy</li>
                            <li>Giáp thiên nhiên</li>
                            <li>Cuồng đao</li>
                            <li>Mặt nạ Berich</li>
                        </ul>
                    </div>
                </div>
                <div className={styles['Service']}>                  
                <h3 ClassName={styles['VatPham']}>Vật phẩm phong thủy</h3>
                    <div className={styles['listProduct']}>              
                        <ul>
                            <li>Vòng ngọc phong thủy</li>
                            <li>Giáp thiên nhiên</li>
                            <li>Cuồng đao</li>
                            <li>Mặt nạ Berich</li>
                        </ul>
                    </div>
                </div>
                <div className={styles['Information']}>                  
                <h3 ClassName={styles['VatPham']}>Vật phẩm phong thủy</h3>
                    <div className={styles['listProduct']}>              
                        <ul>
                            <li>Vòng ngọc phong thủy</li>
                            <li>Giáp thiên nhiên</li>
                            <li>Cuồng đao</li>
                            <li>Mặt nạ Berich</li>
                        </ul>
                    </div>
                </div>
                <div className={styles['Help']}>                  
                                        <h3 ClassName={styles['VatPham']}>Vật phẩm phong thủy</h3>
                    <div className={styles['listProduct']}>              
                        <ul>
                            <li>Vòng ngọc phong thủy</li>
                            <li>Giáp thiên nhiên</li>
                            <li>Cuồng đao</li>
                            <li>Mặt nạ Berich</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );    
}
export default Footer;