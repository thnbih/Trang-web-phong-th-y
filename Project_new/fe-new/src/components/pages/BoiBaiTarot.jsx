import React, { useState } from 'react';
import './BoiBaiTarot.css'

export const BoiBaiTarot = () => {
    const [flipped, setFlipped] = useState(true);

    const flipCard = () => {
        setFlipped(!flipped);
    };

    return (
        <>
            <div className="Banner-Welcome">
                <h1 className="Boi-Bai-Tarot">Boi Bai Tarot</h1>
                <p className="text-Boi-Bai-Tarot">Tai day la noi boi bai tarot linh thien</p>
            </div>
            <div className="Boi-bai-area">
                <div className="Card-area">
                    <div className={`Card ${flipped ? 'flipped' : ''}`}>
                        <img src='https://i.pinimg.com/236x/10/fb/39/10fb39ee5999ce9e05c4bb865fac9077.jpg' alt='Tarot Card'></img>
                    </div>
                    <div className={`Card ${flipped ? 'flipped' : ''}`}>
                        <img src='https://i.pinimg.com/236x/10/fb/39/10fb39ee5999ce9e05c4bb865fac9077.jpg' alt='Tarot Card'></img>
                    </div>
                    <div className={`Card ${flipped ? 'flipped' : ''}`}>
                        <img src='https://i.pinimg.com/236x/10/fb/39/10fb39ee5999ce9e05c4bb865fac9077.jpg' alt='Tarot Card'></img>
                    </div>
                </div>
                <p><button onClick={flipCard}>Lat Bai</button></p>
            </div>
        </>
    );
}
