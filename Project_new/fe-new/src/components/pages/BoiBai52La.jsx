import React, { useState } from 'react';
import './BoiBai52La.css'

export const BoiBai52La = () => {
    const [flipped, setFlipped] = useState(true);

    const flipCard = () => {
        setFlipped(!flipped);
    };

    return (
        <>
            <div className="Banner-Welcome">
                <h1 className="Boi-Bai">Boi Bai 52 La</h1>
                <p className="text-Boi-Bai">Tai day la noi boi bai 52 la linh thien</p>
            </div>
            <div className="Boi-bai-area">
                <div className="Card-area">
                    <div className={`Card ${flipped ? 'flipped' : ''}`}>
                        <img src='https://i.pinimg.com/236x/10/fb/39/10fb39ee5999ce9e05c4bb865fac9077.jpg' alt='Card'></img>
                    </div>
                    <div className={`Card ${flipped ? 'flipped' : ''}`}>
                        <img src='https://i.pinimg.com/236x/10/fb/39/10fb39ee5999ce9e05c4bb865fac9077.jpg' alt='Card'></img>
                    </div>
                    <div className={`Card ${flipped ? 'flipped' : ''}`}>
                        <img src='https://i.pinimg.com/236x/10/fb/39/10fb39ee5999ce9e05c4bb865fac9077.jpg' alt='Card'></img>
                    </div>
                    <div className={`Card ${flipped ? 'flipped' : ''}`}>
                        <img src='https://i.pinimg.com/236x/10/fb/39/10fb39ee5999ce9e05c4bb865fac9077.jpg' alt='Card'></img>
                    </div>
                    <div className={`Card ${flipped ? 'flipped' : ''}`}>
                        <img src='https://i.pinimg.com/236x/10/fb/39/10fb39ee5999ce9e05c4bb865fac9077.jpg' alt='Card'></img>
                    </div>
                </div>
                <p><button onClick={flipCard}>Lat Bai</button></p>
            </div>
        </>
    );
}
