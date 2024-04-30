import React from "react";
import styles from "./BaiVietBlog.module.css";

const BaiVietBlog = () => {
  return (
    <>
      <div className={styles["HeaderBlog"]}>
        <div className={styles["header-title"]}>
          <h1>BLOG</h1>
        </div>
        <div className={styles["header-desc"]}>
          <p>
            Welcome to a world of limitless possibilities,
            where the journey is as exhilarating as the 
            destination, and where every moment is an 
            opportunity to make your mark on the canvas 
            of existence. The only limit is the extent 
            of your imagination.
          </p>
        </div>
      </div>

      <div className={styles["section-one"]}>
        <div className={styles["list-item"]}>
          <ul>
            <li>
              <div className={styles["container"]}>
                <img
                  alt="anh_1_blog"
                  className={styles['images']}
                  src="https://static.overlay-tech.com/assets/adcf77b4-443c-41a3-8f1d-8bdf3a1f88be.png"
                />
                
                <div className={styles["inner-desc"]}>
                  <div className={styles["title"]}>
                    <h1>THE ART OF CONNECTION</h1>
                  </div>
                  <div className={styles["desc"]}>
                    <p>9 Tháng Ba, 2024</p>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className={styles["container"]}>
                <img
                  alt="anh_1_blog"
                  className={styles['images']}
                  src="https://static.overlay-tech.com/assets/adcf77b4-443c-41a3-8f1d-8bdf3a1f88be.png"
                />
                
                <div className={styles["inner-desc"]}>
                  <div className={styles["title"]}>
                    <h1>THE ART OF CONNECTION</h1>
                  </div>
                  <div className={styles["desc"]}>
                    <p>9 Tháng Ba, 2024</p>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className={styles["container"]}>
                <img
                  alt="anh_1_blog"
                  className={styles['images']}
                  src="https://static.overlay-tech.com/assets/adcf77b4-443c-41a3-8f1d-8bdf3a1f88be.png"
                />
                
                <div className={styles["inner-desc"]}>
                  <div className={styles["title"]}>
                    <h1>THE ART OF CONNECTION</h1>
                  </div>
                  <div className={styles["desc"]}>
                    <p>9 Tháng Ba, 2024</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles["section-one"]}>
        <div className={styles["list-item"]}>
          <ul>
            <li>
              <div className={styles["container"]}>
                <img
                  alt="anh_1_blog"
                  className={styles['images']}
                  src="https://static.overlay-tech.com/assets/adcf77b4-443c-41a3-8f1d-8bdf3a1f88be.png"
                />
                
                <div className={styles["inner-desc"]}>
                  <div className={styles["title"]}>
                    <h1>THE ART OF CONNECTION</h1>
                  </div>
                  <div className={styles["desc"]}>
                    <p>9 Tháng Ba, 2024</p>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className={styles["container"]}>
                <img
                  alt="anh_1_blog"
                  className={styles['images']}
                  src="https://static.overlay-tech.com/assets/adcf77b4-443c-41a3-8f1d-8bdf3a1f88be.png"
                />
                
                <div className={styles["inner-desc"]}>
                  <div className={styles["title"]}>
                    <h1>THE ART OF CONNECTION</h1>
                  </div>
                  <div className={styles["desc"]}>
                    <p>9 Tháng Ba, 2024</p>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className={styles["container"]}>
                <img
                  alt="anh_1_blog"
                  className={styles['images']}
                  src="https://static.overlay-tech.com/assets/adcf77b4-443c-41a3-8f1d-8bdf3a1f88be.png"
                />
                
                <div className={styles["inner-desc"]}>
                  <div className={styles["title"]}>
                    <h1>THE ART OF CONNECTION</h1>
                  </div>
                  <div className={styles["desc"]}>
                    <p>9 Tháng Ba, 2024</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles["section-two"]}>
        <div className={styles["header"]}>
          <h1>THEO DÕI</h1>
        </div>

        <div className={styles["desc"]}>
          <p>Enter your email below to receive updates.</p>
        </div>

        <div className={styles["button_text"]}>
          <div className={styles["text-input"]}>
            <input type="text" cols="50" rows="3" placeholder="22521431@gm.uit.edu.vn" ></input>
            <button>Subscribe</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BaiVietBlog;