import React from "react";

const FloatingTimer = ({ timeLeft, formatTime }) => {
    const formattedTime = formatTime(timeLeft);

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '5px',
                zIndex: '999',
            }}
        >
            {formattedTime}
        </div>
    );
};

export default FloatingTimer