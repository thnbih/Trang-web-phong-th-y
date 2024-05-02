// VideoPlayer.jsx
import React, { useEffect, useRef } from 'react';
export const VideoPlayer = ({ user }) => {
  const videoRef = useRef();
  useEffect(() => {
    if (user.videoTrack) {
      user.videoTrack.play(videoRef.current);
    }
    if(user.audioTrack) {
      user.audioTrack.play();
    }
  }, []);
  return (
    <div>
      Uid: {user.uid}
      <div ref={videoRef} style={{ width: '200px', height: '200px' }}></div>
    </div>
  );
};