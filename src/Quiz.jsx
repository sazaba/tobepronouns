// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import FloatingTimer from './FloatingTimer';
// import questionMark from './assets/question.webp'
// import questionAudio from './assets/audio.webp'
// import questionAudio1 from './assets/julie.mp3'
// import questionAudio2 from './assets/questionAudio2.mp3'
// import videosup from './assets/videosup.png'
// import YouTube from 'react-youtube';
// import mchoice from './assets/mchoice.png'
// import fblank from './assets/fblank.png'
// import errorid from './assets/errorid.png'
// import completion from './assets/completion.png'
// import reading from './assets/reading.png'
// import acomprehension from "./assets/acomprehension.png"



// const Quiz = () => {
//     const navigate = useNavigate();
//     const [answers, setAnswers] = useState({});
//     const [score, setScore] = useState(0);
//     const [submitted, setSubmitted] = useState(false);
//     const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds


//     useEffect(() => {
//         handleRetry();

//         const timer = setInterval(() => {
//             setTimeLeft(prevTime => {
//                 if (prevTime === 0) {
//                     clearInterval(timer);
//                     navigate('/timeout');
//                     return 0;
//                 } else {
//                     return prevTime - 1;
//                 }
//             });
//         }, 1000);

//         return () => clearInterval(timer);
//     }, [navigate]);

//     const formatTime = (seconds) => {
//         const minutes = Math.floor(seconds / 60);
//         const remainingSeconds = seconds % 60;
//         return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
//     };

//     const handleRetry = () => {
//         setAnswers({});
//         setScore(0);
//         setSubmitted(false);
//     };



//     const [questions, setQuestions] = useState([

//         {
//             id: 1,
//             question: "___ is my friend. (He/She)",
//             options: ["He", "She"],
//             answer: "She",
//             selectedOption: null
//         },

//         // Puedes agregar más preguntas aquí...
//     ]);

//     const handleAnswer = (questionId, selectedOption) => {
//         const updatedAnswers = { ...answers, [questionId]: selectedOption };
//         setAnswers(updatedAnswers);

//         const updatedQuestions = questions.map(question => {
//             if (question.id === questionId) {
//                 return { ...question, selectedOption };
//             }
//             return question;
//         });
//         setQuestions(updatedQuestions);
//     };

//     const handleSubmit = () => {
//         let correctAnswers = 0;
//         questions.forEach(question => {
//             if (answers[question.id] === question.answer) {
//                 correctAnswers += 1;
//             }
//         });

//         const newScore = correctAnswers;
//         setScore(newScore);

//         const percentage = (correctAnswers / questions.length) * 100;

//         // Navegar a la página de resultados con el puntaje y el porcentaje
//         navigate('/results', { state: { score: newScore, percentage: percentage } });
//     };


//     return (
//         <div className='font-custom flex flex-col items-center space-y-3 mb-20'>
//             <h1 className='font-semibold text-center px-5 pb-7'>Read each question carefully before answering. Good luck!</h1>
//             <FloatingTimer timeLeft={timeLeft} formatTime={formatTime} />


//             <div className='bg-slangup'>
//                 <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Multiple Choice Questions</h2>
//                 <img src={mchoice} alt='' />
//             </div>

//             <div className='bg-slangup'>
//                 <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Fill in the Blank</h2>
//                 <img src={fblank} alt='' />
//             </div>

//             <div className='bg-slangup'>
//                 <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'> Error Identification</h2>
//                 <img src={errorid} alt='' />
//             </div>

//             <div className='bg-slangup'>
//                 <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'> Sentence Completion</h2>
//                 <img src={completion} alt='' />
//             </div>

//             <div className='bg-slangup'>
//                 <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'> Paragraph Interpretation</h2>
//                 <img src={reading} alt='' />
//             </div>

//             <div className='bg-slangup'>
//                 <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'> Audio Comprehension</h2>
//                 <img src={acomprehension} alt='' />
//             </div>



//             {questions.map(question => (
//                 <div className='text-center text-black bg-white shadow-xl rounded-lg p-10 w-[80%]' key={question.id}>
//                     {question.audio && (
//                         <>
//                             <img className='w-20 m-auto' src={questionAudio} alt="Question Audio" />
//                             <audio src={question.audio} controls preload="auto" className="mx-auto w-[100%]"></audio>
//                             <p className='mb-2 py-5'>{question.question}</p>
//                         </>
//                     )}
//                     {question.video && (
//                         <div className="relative">
//                             <YouTube
//                                 videoId="cVsyJvxX48A" // El ID del video de YouTube
//                                 className="mx-auto w-full"
//                                 opts={{ width: '100%' }}
//                             />

//                             <p className="mb-2 py-5">{question.question}</p>
//                         </div>
//                     )}
//                     {!question.audio && !question.video && (
//                         <>
//                             <img className='w-24 m-auto' src={questionMark} alt="Question Mark" />
//                             <p className='mb-2'>{question.question}</p>
//                         </>
//                     )}
//                     <div className='flex flex-wrap justify-center'>
//                         {question.options.map(option => (
//                             <button
//                                 key={option}
//                                 className={`py-1 px-4 rounded ${question.selectedOption === option ? 'bg-green-500' : 'bg-slangup hover:bg-white hover:text-slangup'} text-white font-bold mb-2 mr-2`}
//                                 onClick={() => handleAnswer(question.id, option)}
//                                 disabled={submitted}
//                                 style={{ width: question.options.length > 2 ? '100%' : '50%' }}
//                             >
//                                 {option}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             ))}
//             <button onClick={handleSubmit} className=' bg-lime-400 hover:bg-white hover:text-slangup text-white font-bold py-2 px-4 rounded mx-auto 
//                 w-[80%]' disabled={submitted}>
//                 Submit
//             </button>
//         </div>
//     );
// };

// export default Quiz;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingTimer from './FloatingTimer';
import questionMark from './assets/question.webp';
import questionAudio from './assets/audio.webp';
import YouTube from 'react-youtube';
import mchoice from './assets/mchoice.png';
import fblank from './assets/fblank.png';
import errorid from './assets/errorid.png';
import completion from './assets/completion.png';
import reading from './assets/reading.png';
import acomprehension from './assets/acomprehension.png';

const Quiz = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

    useEffect(() => {
        handleRetry();

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime === 0) {
                    clearInterval(timer);
                    navigate('/timeout');
                    return 0;
                } else {
                    return prevTime - 1;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleRetry = () => {
        setAnswers({});
        setScore(0);
        setSubmitted(false);
    };

    const [questions, setQuestions] = useState({
        multipleChoice: [
            {
                id: 1,
                question: "___ is my friend. (He/She)",
                options: ["He", "She"],
                answer: "She",
                selectedOption: null
            },
            {
                id: 2,
                question: "___ is my friend. (He/She)",
                options: ["He", "She"],
                answer: "She",
                selectedOption: null
            },
            {
                id: 3,
                question: "___ is my friend. (He/She)",
                options: ["He", "She"],
                answer: "She",
                selectedOption: null
            },
            {
                id: 4,
                question: "___ is my friend. (He/She)",
                options: ["He", "She"],
                answer: "She",
                selectedOption: null
            },
            // Más preguntas de multiple choice...
        ],
        fillInTheBlank: [
            {
                id: 1,
                question: "___ is my friend. (He/She)",
                options: ["He", "She"],
                answer: "She",
                selectedOption: null
            },
        ],
        errorIdentification: [
            {
                id: 1,
                question: "___ is my friend. (He/She)",
                options: ["He", "She"],
                answer: "She",
                selectedOption: null
            },
        ],
        sentenceCompletion: [
            {
                id: 1,
                question: "___ is my friend. (He/She)",
                options: ["He", "She"],
                answer: "She",
                selectedOption: null
            },
        ],
        paragraphInterpretation: [
            {
                id: 1,
                question: "___ is my friend. (He/She)",
                options: ["He", "She"],
                answer: "She",
                selectedOption: null
            },
        ],
        audioComprehension: [
            {
                id: 1,
                question: "___ is my friend. (He/She)",
                options: ["He", "She"],
                answer: "She",
                selectedOption: null
            },
        ],
    });

    const handleAnswer = (category, questionId, selectedOption) => {
        const updatedAnswers = { ...answers, [questionId]: selectedOption };
        setAnswers(updatedAnswers);

        const updatedQuestions = {
            ...questions,
            [category]: questions[category].map(question => {
                if (question.id === questionId) {
                    return { ...question, selectedOption };
                }
                return question;
            }),
        };
        setQuestions(updatedQuestions);
    };

    const handleSubmit = () => {
        let correctAnswers = 0;
        Object.values(questions).flat().forEach(question => {
            if (answers[question.id] === question.answer) {
                correctAnswers += 1;
            }
        });

        const newScore = correctAnswers;
        setScore(newScore);

        const percentage = (correctAnswers / Object.values(questions).flat().length) * 100;

        navigate('/results', { state: { score: newScore, percentage: percentage } });
    };

    const renderQuestions = (category, questions) => (
        <div>
            {questions.map(question => (
                <div className='text-center my-20' key={question.id}>
                    {question.audio && (
                        <>
                            <img className='w-20 m-auto' src={questionAudio} alt="Question Audio" />
                            <audio src={question.audio} controls preload="auto" className="mx-auto w-[100%]"></audio>
                            <p className='mb-2 py-5'>{question.question}</p>
                        </>
                    )}
                    {question.video && (
                        <div className="relative">
                            <YouTube
                                videoId="cVsyJvxX48A"
                                className="mx-auto w-full"
                                opts={{ width: '100%' }}
                            />
                            <p className="mb-2 py-5">{question.question}</p>
                        </div>
                    )}
                    {!question.audio && !question.video && (
                        <>
                            <img className='w-24 m-auto' src={questionMark} alt="Question Mark" />
                            <p className='mb-2'>{question.question}</p>
                        </>
                    )}
                    <div className='flex flex-wrap justify-center'>
                        {question.options.map(option => (
                            <button
                                key={option}
                                className={`py-1 px-4 rounded ${question.selectedOption === option ? 'bg-green-500' : 'bg-slangup hover:bg-white hover:text-slangup'} text-white font-bold mb-2 mr-2`}
                                onClick={() => handleAnswer(category, question.id, option)}
                                disabled={submitted}
                                style={{ width: question.options.length > 2 ? '100%' : '50%' }}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className='font-custom flex flex-col items-center space-y-3 mb-20'>
            <h1 className='font-semibold text-center px-5 pb-7'>Read each question carefully before answering. Good luck!</h1>
            <FloatingTimer timeLeft={timeLeft} formatTime={formatTime} />

            <div className='bg-slangup'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Multiple Choice Questions</h2>
                <img src={mchoice} alt='' />
            </div>
            {renderQuestions("Multiple Choice Questions", questions.multipleChoice)}

            <div className='bg-slangup'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Fill in the Blank</h2>
                <img src={fblank} alt='' />
            </div>
            {renderQuestions("Fill in the Blank", questions.fillInTheBlank)}

            <div className='bg-slangup'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'> Error Identification</h2>
                <img src={errorid} alt='' />
            </div>
            {renderQuestions("Error Identification", questions.errorIdentification)}

            <div className='bg-slangup'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'> Sentence Completion</h2>
                <img src={completion} alt='' />
            </div>
            {renderQuestions("Sentence Completion", questions.sentenceCompletion)}

            <div className='bg-slangup'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'> Paragraph Interpretation</h2>
                <img src={reading} alt='' />
            </div>
            {renderQuestions("Paragraph Interpretation", questions.paragraphInterpretation)}

            <div className='bg-slangup'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'> Audio Comprehension</h2>
                <img src={acomprehension} alt='' />
            </div>

            {renderQuestions("Audio Comprehension", questions.audioComprehension)}






            <button onClick={handleSubmit} className=' bg-lime-400 hover:bg-white hover:text-slangup text-white font-bold py-2 px-4 rounded mx-auto 
                w-[80%]' disabled={submitted}>
                Submit
            </button>
        </div>
    );
};

export default Quiz;
