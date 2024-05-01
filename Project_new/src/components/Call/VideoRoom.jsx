import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { VideoPlayer } from './VideoPlayer';

const APP_ID = 'c437536f270343ed9ab53fc6af0f996a';
const TOKEN =
  '007eJxTYOB5m6h0+obw3Zm5e4J2yOvf2+6xOiziw/Hf/AtilP0ZBKcoMCSbGJubGpulGZkbGJsYp6ZYJiaZGqclmyWmGaRZWpolTuE0SmsIZGRI+VrGxMgAgSA+O0NiXl5GZmoeAwMAhTUf1A==';
const CHANNEL = 'annhien';

const client = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'vp8',
});

export const VideoRoom = () => {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);
  
    if (mediaType === 'video') {
      const player = document.createElement('div');
      player.id = user.uid.toString();
      document.body.append(player);
      user.videoTrack.play(player.id);
    }
  
    if (mediaType === 'audio') {
      // user.audioTrack.play()
    }
  };
  

  const handleUserLeft = (user) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };

  useEffect(() => {
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
    <div
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 200px)',
        }}
      >
        {users.map((user) => (
          <VideoPlayer key={user.uid} user={user} />
        ))}
      </div>
    </div>
  );
};