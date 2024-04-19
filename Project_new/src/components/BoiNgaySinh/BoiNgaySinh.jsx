import React, { useState } from 'react';
import styles from './BoiNgaySinh.module.css';

function BoiNgaySinh() {
    const [flipped, setFlipped] = useState(false);

    const flipCard = () => {
        setFlipped(!flipped);
    };

    return (
        <>
            <div className={styles['BoiNgaySinh']}>
                <div className={styles['Header']}>
                    <div className={styles['Header-container']}>
                        <div className={styles['Header-title']}>
                            <h1>BÓI NGÀY SINH</h1>
                        </div>
                        <div className={styles['Header-text']}>
                            <p>
                                Ngày sinh có ý nghĩa đặc biệt trong cuộc đời
                                của mỗi con người. Không chỉ quyết định
                                tính cách, sự nghiệp, tình duyên nghề nghiệp,
                                may mắn, vận hạn trong đời. Khoa học vẫn đang
                                nghiên cứu về bí ẩn ngày sinh của con người.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles['Body']}>
                    <div className={styles['Guide-text']}>
                        <p>Hãy cho chúng mình biết thông tin của bạn!</p>
                    </div>
                    <div className={styles['Input-area']}>
                        <ul>
                            <li>
                                <div className={styles['input-container']}>
                                    <div className={styles['input-text']}>
                                        <p>Ngày</p>
                                    </div>
                                    <div className={styles['input-area']}>
                                        <select className={styles['select']} size={1}>
                                            {Array.from({ length: 30 }, (_, index) => (
                                                <option key={index + 1} value={index + 1}>
                                                    {index + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className={styles['input-container']}>
                                    <div className={styles['input-text']}>
                                        <p>Tháng</p>
                                    </div>
                                    <div className={styles['input-area']}>
                                        <select className={styles['select']} size={1}>
                                            {Array.from({ length: 12 }, (_, index) => (
                                                <option key={index + 1} value={index + 1}>
                                                    {index + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className={styles['input-container']}>
                                    <div className={styles['input-text']}>
                                        <p>Năm</p>
                                    </div>
                                    <div className={styles['input-area']}>
                                        <select className={styles['select']} size={1}>
                                            {Array.from({ length: 80 }, (_, index) => (
                                                <option key={index + 1950} value={index + 1950}>
                                                    {index + 1950}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className={styles['Button-area']}>
                        <button>
                            <p>Xem ngay</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BoiNgaySinh;
