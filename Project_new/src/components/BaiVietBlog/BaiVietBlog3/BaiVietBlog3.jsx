import React from "react";
import styles from "./BaiVietBlog4.module.scss";

const BaiVietBlog4 = () => {
  return (
    <div className={styles.group5}>
      <div className={styles.group4}>
        <p className={styles.theoDoi}>THEO DÕI</p>
        <p
          className={
            styles.enterYourEmailBelowToReceiveUpdate
          }
        >
          Enter your email below to receive updates.
        </p>
      </div>
      <div className={styles.frame1}>
        <div className={styles.group3}>
          <div className={styles.rectangle8} />
          <div className={styles.group2}>
            <p className={styles.subcribe}>Subcribe</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaiVietBlog4;