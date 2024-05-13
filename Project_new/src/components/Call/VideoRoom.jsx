// VideoRoom.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import AgoraRTC from 'agora-rtc-sdk-ng';
import { VideoPlayer } from './VideoPlayer';
import styles from './Call.module.css';

const APP_ID = 'c437536f270343ed9ab53fc6af0f996a';
const TOKEN =
  '007eJxTYHi998F1lpovp1R1guS1Hs41a17E+eHSxpqpZbx36+pYX+QpMCSbGJubGpulGZkbGJsYp6ZYJiaZGqclmyWmGaRZWpolPq91TGsIZGRo/3eOkZEBAkF8dobEvLyMzNQ8BgYAJ7YioA==';
const CHANNEL = 'annhien';

export const VideoRoom = () => {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [client] = useState(() =>
    AgoraRTC.createClient({
      mode: 'rtc',
      codec: 'vp8',
    })
  );

  useEffect(() => {
    const handleUserJoined = async (user, mediaType) => {
      await client.subscribe(user, mediaType);

      if (mediaType === 'video') {
        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid: user.uid,
            videoTrack: user.videoTrack,
          },
        ]);
      }

      if (mediaType === 'audio') {
        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid: user.uid,
            audioTrack: user.audioTrack,
          },
        ]);
      }
    };

    const handleUserLeft = (user) => {
      setUsers((previousUsers) =>
        previousUsers.filter((u) => u.uid !== user.uid)
      );
    };

    client.on('user-published', handleUserJoined);
    client.on('user-left', handleUserLeft);

    client
      .join(APP_ID, CHANNEL, TOKEN, null)
      .then((uid) =>
        Promise.all([
          AgoraRTC.createCameraVideoTrack({ facingMode: 'user' }),
          AgoraRTC.createMicrophoneAudioTrack(),
          uid,
        ])
      )
      .then(([videoTrack, audioTrack, uid]) => {
        setLocalTracks([videoTrack, audioTrack]);
        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid,
            videoTrack,
            audioTrack,
          },
        ]);
        client.publish([videoTrack, audioTrack]);
      });

    return () => {
      for (let localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }
      client.off('user-published', handleUserJoined);
      client.off('user-left', handleUserLeft);
      client.unpublish(localTracks).then(() => client.leave());
    };
  }, []);

  const toggleCamera = async () => {
    if (localTracks.length > 0) {
      const [videoTrack] = localTracks.filter(
        (track) => track.kind === 'video'
      );
      if (videoTrack) {
        await videoTrack.setEnabled(!videoTrack.enabled);
        setCameraEnabled(videoTrack.enabled);
      }
    }
  };
  
  const toggleMic = async () => {
    if (localTracks.length > 0) {
      const [audioTrack] = localTracks.filter(
        (track) => track.kind === 'audio'
      );
      if (audioTrack) {
        await audioTrack.setEnabled(!audioTrack.enabled);
        setMicEnabled(audioTrack.enabled);
      }
    }
  };

  const leaveChannel = async () => {
    for (let localTrack of localTracks) {
      localTrack.stop();
      localTrack.close();
    }
    client.off('user-published', handleUserJoined);
    client.off('user-left', handleUserLeft);
    await client.unpublish(localTracks);
    await client.leave();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 200px)' }}>
          {users.map((user) => (
            <VideoPlayer key={user.uid} user={user} />
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button onClick={toggleCamera}>
          {cameraEnabled ? 'Disable Camera' : 'Enable Camera'}
        </button>
        <button onClick={toggleMic}>
          {micEnabled ? 'Disable Microphone' : 'Enable Microphone'}
        </button>
        <button onClick={leaveChannel}>Leave Channel</button>
      </div>
    </div>
  );
};