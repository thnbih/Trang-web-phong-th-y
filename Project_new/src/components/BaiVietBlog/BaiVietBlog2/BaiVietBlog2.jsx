import React from "react";
import styles from "./BaiVietBlog3.module.scss";

const BaiVietBlog3 = () => {
  return (
    <div className={styles.baiVietBlog3}>
      <div className={styles.flexWrapperOne}>
        <img
          alt=""
          className={styles.paintTall2}
          src="https://static.overlay-tech.com/assets/12a3b79e-74fd-48a9-b263-11ac85421bd8.png"
        />
        <img
          alt=""
          className={styles.paintTall2}
          src="https://static.overlay-tech.com/assets/fc66a643-f80e-46db-abb3-5314739f8d8f.png"
        />
        <img
          alt=""
          className={styles.paintTall2}
          src="https://static.overlay-tech.com/assets/a449d95d-3770-4c95-8286-6e57f4e17db4.png"
        />
      </div>
      <div className={styles.flexWrapperTwo}>
        <p className={styles.collaborationMagic}>
          COLLABORATION MAGIC
        </p>
        <p className={styles.teamworkTriumphs}>
          TEAMWORK TRIUMPHS
        </p>
        <p className={styles.adaptiveAdvantage}>
          ADAPTIVE ADVANTAGE
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

export default BaiVietBlog3;