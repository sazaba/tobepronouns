import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Passed from './assets/passed.png';
import Failed from './assets/failed.png';

function Results() {
    const location = useLocation();
    const score = location.state.score;
    const percentage = location.state.percentage;

    let resultTitle = "";
    let imageSrc = "";
    let bgColorClass = "";

    if (percentage >= 70) {
        resultTitle = "Congratulations, you passed this test!";
        imageSrc = Passed; // Asignamos la variable de la imagen a imageSrc
        // bgColorClass = "bg-slangup";
    } else {
        resultTitle = "You did not pass this test.";
        imageSrc = Failed; // Asignamos la variable de la imagen a imageSrc
        // bgColorClass = "bg-red-500";
    }

    return (
        <div className={`relative ${bgColorClass} flex flex-col items-center text-center font-custom `}>
            <img className='w-40' src={imageSrc} alt='' /> {/* Utilizamos la variable imageSrc */}

            <div className="relative z-10 space-y-1">
                <h2 className='font-bold'>{resultTitle}</h2>
                <p>Your Score: {score}</p>
                <p>Percentage: {percentage}%</p>
                <Link to="/">
                    <button className=' bg-slangup hover:bg-white hover:text-slangup text-white font-bold mt-2 py-2 px-4 rounded mx-auto 
                @screen md:w-[70%]
                @screen sm:w-[70%]'>Retry Test</button>
                </Link>
            </div>
        </div>
    );
}

export default Results;
