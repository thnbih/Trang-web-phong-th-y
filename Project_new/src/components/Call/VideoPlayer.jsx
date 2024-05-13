// VideoPlayer.jsx
import React, { useEffect, useRef } from 'react';

export const VideoPlayer = ({ user }) => {
  const videoRef = useRef();
  const overlayRef = useRef();

  useEffect(() => {
    if (user.videoTrack) {
      const playerElement = videoRef.current;
      const overlayElement = overlayRef.current;

      if (user.videoTrack.enabled) {
        user.videoTrack.play(playerElement);
        overlayElement.style.display = 'none';
      } else {
        // Display a black overlay on the video track
        overlayElement.style.display = 'block';
      }
    }

    if (user.audioTrack) {
      user.audioTrack.play();
    }

    return () => {
      // Clean up the video player
      if (user.videoTrack) {
        user.videoTrack.stop();
      }
      if (user.audioTrack) {
        user.audioTrack.stop();
      }
    };
  }, [user.videoTrack, user.audioTrack, user.videoTrack?.enabled]);

  return (
    <div>
      Uid: {user.uid}
      <div style={{ position: 'relative', width: '200px', height: '200px' }}>
        <div ref={videoRef} style={{ width: '100%', height: '100%' }}></div>
        <div
          ref={overlayRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            display: 'none',
          }}
        ></div>
      </div>
    </div>
  );
};