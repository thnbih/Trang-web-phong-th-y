import React , { useState }from 'react';
import styles from './Call.module.css';
import { VideoRoom } from './VideoRoom';

function Call() {
        const [joined, setJoined] = useState(false);
        return (
          <div className="App">
            <h1>WDJ Virtual Call</h1>
      
            {!joined && (
              <button onClick={() => setJoined(true)}>
                Join Room
              </button>
            )}
      
            {joined && <VideoRoom />}
          </div>
        );
}

export default Call;