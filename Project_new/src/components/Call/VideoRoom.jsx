// VideoRoom.jsx
import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { VideoPlayer } from './VideoPlayer';

const APP_ID = 'c437536f270343ed9ab53fc6af0f996a';
const TOKEN =
  '007eJxTYChcGHG1cONuFbui78ltJ2Rvx8xbsiNcbeXVwDl9nxou8FQoMCSbGJubGpulGZkbGJsYp6ZYJiaZGqclmyWmGaRZWpolGidYpDUEMjKorG5gYmSAQBCfnSExLy8jMzWPgQEADKIhPw==';
const CHANNEL = 'annhien';

export const VideoRoom = () => {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);
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

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 200px)' }}>
        {users.map((user) => (
          <VideoPlayer key={user.uid} user={user} />
        ))}
      </div>
    </div>
  );
};
