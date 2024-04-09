import React from "react";
import styles from "./BaiVietBlog2.module.scss";

const BaiVietBlog2 = () => {
  return (
    <div className={styles.baiVietBlog2}>
      <div className={styles.flexWrapperOne}>
        <img
          alt=""
          className={styles.paintTall2}
          src="https://static.overlay-tech.com/assets/adcf77b4-443c-41a3-8f1d-8bdf3a1f88be.png"
        />
        <img
          alt=""
          className={styles.paintTall2}
          src="https://static.overlay-tech.com/assets/fdefe57b-6b9b-4255-9443-85cfaa7ead95.png"
        />
        <img
          alt=""
          className={styles.paintTall2}
          src="https://static.overlay-tech.com/assets/b30b1200-9f7e-4268-909a-a55b7e06bd0b.png"
        />
      </div>
      <div className={styles.flexWrapperTwo}>
        <p className={styles.theArtOfConnect}>
          THE ART OF CONNECT
        </p>
        <p className={styles.beyondTheObstacle}>
          BEYOND THE OBSTACLE
        </p>
        <p className={styles.growthUnlocked}>
          GROWTH UNLOCKED
        </p>
      </div>
      <div className={styles.flexWrapperOne}>
        <p className={styles.num9ThangBa2024}>
          9 Tháng Ba, 2024
        </p>
        <p className={styles.num9ThangBa2024}>
          9 Tháng Ba, 2024
        </p>
        <p className={styles.num9ThangBa2024}>
          9 Tháng Ba, 2024
        </p>
      </div>
    </div>
  );
};

export default BaiVietBlog2;