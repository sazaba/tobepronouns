
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

    const handleInputChange = (category, questionId, event) => {
        const { value } = event.target;
        handleAnswer(category, questionId, value);
    };


    const [questions, setQuestions] = useState({
        multipleChoice: [

            {
                id: 1,
                question: "Choose the correct form of the verb: She ___ (go/goes) to school every day.",
                options: ["go", "goes", "going", "went"],
                answer: "goes",
                selectedOption: null
            },
            {
                id: 2,
                question: "Which sentence uses the correct possessive pronoun?",
                options: [
                    "The book is your's.",
                    "That is hers umbrella.",
                    "His backpack is over there.",
                    "Their going to the party tonight."
                ],
                answer: "His backpack is over there.",
                selectedOption: null
            },
            {
                id: 3,
                question: "Which sentence correctly uses the simple present tense?",
                options: [
                    "She is going to the store yesterday.",
                    "He go to school every morning.",
                    "They are playing soccer right now.",
                    "We will went to the park tomorrow."
                ],
                answer: "They are playing soccer right now.",
                selectedOption: null
            },
            {
                id: 4,
                question: "Choose the correct article: He wants to buy ___ new car.",
                options: ["a", "an", "the", "some"],
                answer: "a",
                selectedOption: null
            },
            {
                id: 5,
                question: "Identify the correct personal pronoun: Sarah and ___ are going to the store.",
                options: ["I", "me", "my", "mine"],
                answer: "me",
                selectedOption: null
            },
            // Más preguntas de multiple choice...
        ],
        fillInTheBlank: [

            {
                id: 6,
                question: "They ___ (play) soccer every Saturday.",
                options: ["play", "plays"],
                answer: ["play", "Play"],
                selectedOption: null
            },
            {
                id: 7,
                question: "My dog always chews ___ (his/him) bone in the evening.",
                options: ["his", "him"],
                answer: ["his", "His"],
                selectedOption: null
            },
            {
                id: 8,
                question: "We went to the beach ___ (yesterday/ago).",
                options: ["yesterday", "ago"],
                answer: ["yesterday", "Yesterday"],
                selectedOption: null
            },
            {
                id: 9,
                question: "She put ___ (a/an) orange on the table.",
                options: ["a", "an"],
                answer: ["an", "An"],
                selectedOption: null
            },
            {
                id: 10,
                question: "___ (He/Him) and his sister like to swim.",
                options: ["He", "Him"],
                answer: ["He", "he"],
                selectedOption: null
            },
        ],
        errorIdentification: [
            {
                id: 3,
                question: " She don't like apples.",
                options: ["don't", "like", "apples"],
                answer: "don't",
                selectedOption: null
            },
        ],
        sentenceCompletion: [
            {
                id: 4,
                question: " He is going to the ___.",
                options: ["park", "market"],
                answer: "market",
                selectedOption: null
            },
        ],
        paragraphInterpretation: [
            {
                id: 5,
                question: " The quick brown fox jumps over the lazy dog. What is the dog doing?",
                options: ["jumping", "lazy"],
                answer: "lazy",
                selectedOption: null
            },
        ],
        audioComprehension: [
            {
                id: 6,
                question: " What is Julie's favorite color?",
                options: ["Blue", "Green"],
                answer: "Blue",
                selectedOption: null,
                audio: 'path/to/audio.mp3'
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
            const isCorrect = Array.isArray(question.answer)
                ? question.answer.includes(answers[question.id])
                : question.answer === answers[question.id];

            if (isCorrect) {
                correctAnswers += 1;
            }
        });

        const newScore = correctAnswers;
        setScore(newScore);

        const percentage = (correctAnswers / Object.values(questions).flat().length) * 100;

        navigate('/results', { state: { score: newScore, percentage: percentage } });
    };


    const renderQuestions = (category, questions) => (
        <div className='category-container'>
            {questions.map(question => (
                <div className='text-center my-20' key={question.id}>
                    {question.audio && (
                        <>
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
                            <p className=' mb-2 px-3'>{question.question}</p>
                        </>
                    )}
                    <div className='flex flex-wrap justify-center'>
                        {category === 'fillInTheBlank' ? (
                            <input
                                type="text"
                                className='py-1 px-4 rounded border-2 border-gray-300 mb-2 mr-2'
                                value={question.selectedOption || ''}
                                onChange={(e) => handleInputChange(category, question.id, e)}
                                disabled={submitted}
                            />
                        ) : (
                            question.options.map(option => (
                                <button
                                    key={option}
                                    className={`py-1 px-5 rounded ${question.selectedOption === option ? 'bg-green-500' : 'bg-slangup hover:bg-white hover:text-slangup'} text-white font-bold mb-2 mr-2`}
                                    onClick={() => handleAnswer(category, question.id, option)}
                                    disabled={submitted}
                                    style={{ width: question.options.length > 2 ? '80%' : '50%' }}
                                >
                                    {option}
                                </button>
                            ))
                        )}
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
            {renderQuestions("multipleChoice", questions.multipleChoice)}

            <div className='bg-slangup'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Fill in the Blank</h2>
                <img src={fblank} alt='' />
            </div>
            {renderQuestions("fillInTheBlank", questions.fillInTheBlank)}

            <div className='bg-slangup'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Error Identification</h2>
                <img src={errorid} alt='' />
            </div>
            {renderQuestions("errorIdentification", questions.errorIdentification)}

            <div className='bg-slangup'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Sentence Completion</h2>
                <img src={completion} alt='' />
            </div>
            {renderQuestions("sentenceCompletion", questions.sentenceCompletion)}

            <div className='bg-slangup'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Paragraph Interpretation</h2>
                <img src={reading} alt='' />
            </div>
            {renderQuestions("paragraphInterpretation", questions.paragraphInterpretation)}

            <div className='bg-slangup'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Audio Comprehension</h2>
                <img src={acomprehension} alt='' />
            </div>
            {renderQuestions("audioComprehension", questions.audioComprehension)}

            <button onClick={handleSubmit} className=' bg-lime-400 hover:bg-white hover:text-slangup text-white font-bold py-2 px-4 rounded mx-auto 
                w-[80%]' disabled={submitted}>
                Submit
            </button>
        </div>
    );
};

export default Quiz;
