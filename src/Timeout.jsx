import React from 'react';
import { useNavigate } from 'react-router-dom';

const Timeout = () => {
    const navigate = useNavigate();

    const handleRetry = () => {
        navigate('/'); // Ajusta esto a la ruta correcta de tu componente de quiz
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <h1 className="text-2xl font-bold mb-4">Time's up!</h1>
            <p className="mb-4">Do you want to try again?</p>
            <button
                onClick={handleRetry}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
                Retry
            </button>
        </div>
    );
};

export default Timeout;
