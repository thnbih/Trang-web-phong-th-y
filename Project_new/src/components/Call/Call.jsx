// Call.jsx
import React, { useState } from 'react';
import styles from './Call.module.css';
import { VideoRoom } from './VideoRoom';
import { Analytics } from '@vercel/analytics/react';


function Call() {
  const [joined, setJoined] = useState(false);
  return (
    <div className="Call">
      <h1>Tại đây là nơi trò chuyện 1 - 1</h1>

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
