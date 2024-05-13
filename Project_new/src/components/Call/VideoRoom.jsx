// VideoRoom.jsx
import { useRef, useState } from "react";
import styles from "./VideoRoom.module.css";
import {
  createClient,
  createCameraVideoTrack,
  createMicrophoneAudioTrack,
  onCameraChanged,
  onMicrophoneChanged
} from "agora-rtc-sdk-ng/esm";

const client = createClient({
  mode: "rtc",
  codec: "vp8",
});

let audioTrack;
let videoTrack;

export const VideoRoom = () => {
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioPubed, setIsAudioPubed] = useState(false);
  const [isVideoPubed, setIsVideoPubed] = useState(false);
  const [isVideoSubed, setIsVideoSubed] = useState(false);

  const turnOnCamera = async (flag) => {
    flag = flag ?? !isVideoOn;
    setIsVideoOn(flag);

    if (videoTrack) {
      return videoTrack.setEnabled(flag);
    }
    videoTrack = await createCameraVideoTrack();
    videoTrack.play("camera-video");
  };

  const turnOnMicrophone = async (flag) => {
    flag = flag ?? !isAudioOn;
    setIsAudioOn(flag);

    if (audioTrack) {
      return audioTrack.setEnabled(flag);
    }

    audioTrack = await createMicrophoneAudioTrack();
  };

  const [isJoined, setIsJoined] = useState(false);
  const channel = useRef("annhien");
  const appid = useRef("c437536f270343ed9ab53fc6af0f996a");
  const token = useRef("007eJxTYHi998F1lpovp1R1guS1Hs41a17E+eHSxpqpZbx36+pYX+QpMCSbGJubGpulGZkbGJsYp6ZYJiaZGqclmyWmGaRZWpolPq91TGsIZGRo/3eOkZEBAkF8dobEvLyMzNQ8BgYAJ7YioA==");

  const joinChannel = async () => {
    if (!channel.current) {
      channel.current = "react-room";
    }

    if (isJoined) {
      await leaveChannel();
    }

    client.on("user-published", onUserPublish);

    await client.join(
      appid.current,
      channel.current,
      token.current || null,
      null
    );
    setIsJoined(true);
  };

  const leaveChannel = async () => {
    setIsJoined(false);
    setIsAudioPubed(false);
    setIsVideoPubed(false);

    await client.leave();
  };

  const onUserPublish = async (user, mediaType) => {
    if (mediaType === "video") {
      const remoteTrack = await client.subscribe(user, mediaType);
      remoteTrack.play("remote-video");
      setIsVideoSubed(true);
    }
    if (mediaType === "audio") {
      const remoteTrack = await client.subscribe(user, mediaType);
      remoteTrack.play();
    }
  };

  const publishVideo = async () => {
    await turnOnCamera(true);

    if (!isJoined) {
      await joinChannel();
    }
    await client.publish(videoTrack);
    setIsVideoPubed(true);
  };

  const publishAudio = async () => {
    await turnOnMicrophone(true);

    if (!isJoined) {
      await joinChannel();
    }

    await client.publish(audioTrack);
    setIsAudioPubed(true);
  };

  return (
    <div>
      <div className="left-side">
        <h3 className={styles.text}>Please check your camera / microphone!</h3>
        <div className={styles.buttonContainer}>
          <button
            onClick={() => turnOnCamera()}
            className={`${styles.button} ${isVideoOn ? "button-on" : ""}`}
          >
            Turn {isVideoOn ? "off" : "on"} camera
          </button>
          <button
            onClick={() => turnOnMicrophone()}
            className={`${styles.button} ${isAudioOn ? "button-on" : ""}`}
          >
            Turn {isAudioOn ? "off" : "on"} Microphone
          </button>
        </div>

        <div className={styles.buttonContainer}>
          <button
            onClick={joinChannel}
            className={`${styles.button} ${isJoined ? "button-on" : ""}`}
          >
            Join Channel
          </button>
          <button
            onClick={publishVideo}
            className={`${styles.button} ${isVideoPubed ? "button-on" : ""}`}
          >
            Publish Video
          </button>
          <button
            onClick={publishAudio}
            className={`${styles.button} ${isAudioPubed ? "button-on" : ""}`}
          >
            Publish Audio
          </button>
          <button onClick={leaveChannel} className={styles.button}>
            Leave Channel
          </button>
        </div>
      </div>
      <div className="right-side">
        <video id="camera-video" hidden={isVideoOn ? false : true} width={250} height={250}></video>
        <video id="remote-video" hidden={isVideoSubed ? false : true} width={250} height={250}></video>
        {isJoined && !isVideoSubed ? (
          <div className={`waiting ${styles.text}`}>
            You can share channel {channel.current} with others...
          </div>
        ) : null}
      </div>
    </div>
  );
}; 