import React, { useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import styles from '../BoiBai52La/BoiBai52La.module.css';

export function ReadAloudButton({ text }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);

    const handleClick = async () => {
        try {
            setIsPlaying(true);
            const response = await axios.post('http://localhost:5000/api/synthesize', { text }, {
                responseType: 'blob',
            });
            const audioBlob = new Blob([response.data], { type: 'audio/wav' });
            const url = URL.createObjectURL(audioBlob);
            setAudioUrl(url);
        } catch (error) {
            console.error('Error synthesizing speech:', error);
            setIsPlaying(false);
        }
    };

    const handleAudioEnded = () => {
        setIsPlaying(false);
        setAudioUrl(null);
    };

    return (
        <>
            <button className={styles.readAloudButton} onClick={handleClick} disabled={isPlaying}>
                {isPlaying ? 'Playing...' : 'Read Aloud'}
            </button>
            {audioUrl && (
                <ReactPlayer
                    url={audioUrl}
                    playing={isPlaying}
                    onEnded={handleAudioEnded}
                    style={{ display: 'none' }}
                />
            )}
        </>
    );
}