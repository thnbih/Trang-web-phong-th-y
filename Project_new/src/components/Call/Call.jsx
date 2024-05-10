// Call.jsx
import React, { useState } from 'react';
import styles from './Call.module.css';
import { VideoRoom } from './VideoRoom';
import { Analytics } from '@vercel/analytics/react';
import { Helmet } from 'react-helmet';

function Call() {
  const [joined, setJoined] = useState(false);
  return (
    <div className="Call">
      <Helmet>
        <title>Trò Chuyện 1 - 1 - Kết Nối Trực Tiếp Với Người Thân</title>
        <meta
          name="description"
          content="Tại đây là nơi trò chuyện 1 - 1 với người có chuyên môn một cách trực tiếp và tiện lợi. Hãy tham gia ngay và kết nối với những người ấy ngay."
        />
      </Helmet>

      <header>
        <h1>Tại đây là nơi trò chuyện 1 - 1</h1>
      </header>

      {!joined && (
        <div className={styles.buttonContainer}>
          <button className={styles.Button} onClick={() => setJoined(true)}>
            Join Room
          </button>
        </div>
      )}

      {joined && <VideoRoom />}
      <Analytics />
    </div>
  );
}

export default Call;