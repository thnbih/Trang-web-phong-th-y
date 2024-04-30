import React from 'react';
import styles from './Footer.module.css';

function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.NamePage}>                  
                <h3>An Nhiên</h3>
            </div>
            <div className={styles.Product}> 
                <h3 className={styles.VatPham}>Vật phẩm phong thủy</h3>
                <div className={styles.listProduct}>              
                    <ul>
                        <li>Vòng ngọc phong thủy</li>
                        <li>Giáp thiên nhiên</li>
                        <li>Cuồng đao</li>
                        <li>Mặt nạ Berich</li>
                    </ul>
                </div>
            </div>
            <div className={styles.Service}>                  
                <h3 className={styles.VatPham}>Dịch vụ</h3>
                <div className={styles.listProduct}>              
                    <ul>
                        <li>Bói bài tây</li>
                        <li>Tarot</li>
                        <li>Xem ngày sinh</li>
                        <li>Tư vấn phong thủy</li>
                    </ul>
                </div>
            </div>
            <div className={styles.Information}>                  
                <h3 className={styles.VatPham}>Thông tin</h3>
                <div className={styles.listProduct}>              
                    <ul>
                        <li>Giới thiệu</li>
                        <li>Chính sách bảo mật</li>
                        <li>Điều khoản sử dụng</li>
                        <li>Liên hệ</li>
                    </ul>
                </div>
            </div>
            <div className={styles.Help}>                  
                <h3 className={styles.VatPham}>Trợ giúp</h3>
                <div className={styles.listProduct}>              
                    <ul>
                        <li>Hỏi đáp</li>
                        <li>Hướng dẫn mua hàng</li>
                        <li>Phương thức thanh toán</li>
                        <li>Chăm sóc khách hàng</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;
