
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingTimer from './FloatingTimer';
import questionMark from './assets/question.webp';
import questionAudio from './assets/audio.webp';
import YouTube from 'react-youtube';
import mchoice from './assets/mchoice.webp';
import fblank from './assets/fblank.webp';
import errorid from './assets/errorid.webp';
import completion from './assets/completion.webp';
import reading from './assets/reading.webp';
import acomprehension from './assets/acomprehension.webp';
import julie from './assets/julie.mp3'

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
                "id": 1,
                "question": "Choose the correct form of the verb 'to be': She ___ a teacher.",
                "options": ["is", "am", "are", "be"],
                "answer": ["is"],
                "selectedOption": null
            },
            {
                "id": 2,
                "question": "Choose the correct pronoun (Male): ___ is my best friend.",
                "options": ["He", "She", "They", "We"],
                "answer": ["He"],
                "selectedOption": null
            },
            {
                "id": 3,
                "question": "Choose the correct possessive pronoun: This is ___ book.",
                "options": ["my", "mine", "I", "me"],
                "answer": ["my"],
                "selectedOption": null
            },
            {
                "id": 4,
                "question": "Choose the correct form of the verb 'to be': They ___ at home.",
                "options": ["is", "am", "are", "be"],
                "answer": ["are"],
                "selectedOption": null
            },
            {
                "id": 5,
                "question": "Choose the correct pronoun: ___ are going to the store.",
                "options": ["He", "I", "We", "She"],
                "answer": ["We"],
                "selectedOption": null
            }
        ]
        ,
        fillInTheBlank: [
            {
                "id": 6,
                "question": "I ___ happy to see you.",
                "options": [],
                "answer": ["am", "AM", "Am"],
                "selectedOption": null
            },
            {
                "id": 7,
                "question": "They ___ my friends.",
                "options": [],
                "answer": ["are", "Are", "ARE"],
                "selectedOption": null
            },
            {
                "id": 8,
                "question": "She ___ not at home.",
                "options": [],
                "answer": ["is", "Is", "IS"],
                "selectedOption": null
            },
            {
                "id": 9,
                "question": "We ___ ready to go.",
                "options": [],
                "answer": ["are", "Are", "ARE"],
                "selectedOption": null
            },
            {
                "id": 10,
                "question": "He ___ my brother.",
                "options": [],
                "answer": ["is", "Is", "IS"],
                "selectedOption": null
            }
        ]
        ,
        errorIdentification: [
            {
                "id": 11,
                "question": "They is going to the park.",
                "options": ["They", "is", "going", "to"],
                "answer": ["is"],
                "selectedOption": null
            },
            {
                "id": 12,
                "question": "She are a doctor.",
                "options": ["she", "are", "a", "doctor"],
                "answer": ["are"],
                "selectedOption": null
            },
            {
                "id": 13,
                "question": "I am happy to see they.",
                "options": ["I", "am", "happy", "they"],
                "answer": ["they"],
                "selectedOption": null
            },
            {
                "id": 14,
                "question": "You is my friend.",
                "options": ["You", "is", "my", "friend"],
                "answer": ["is"],
                "selectedOption": null
            },
            {
                "id": 15,
                "question": "This is hers book.",
                "options": ["this", "is", "hers", "book"],
                "answer": ["hers"],
                "selectedOption": null
            }
        ]
        ,
        sentenceCompletion: [
            {
                "id": 16,
                "question": "___ (Male) has a dog.",
                "options": ["He", "She"],
                "answer": ["He", "he", "HE"],
                "selectedOption": null
            },
            {
                "id": 17,
                "question": "___ (Them) are going to the cinema.",
                "options": ["They", "We"],
                "answer": ["They", "They", "THEY"],
                "selectedOption": null
            },
            {
                "id": 18,
                "question": "___ (Me) am very tired.",
                "options": ["I", "You"],
                "answer": ["I", "i"],
                "selectedOption": null
            },
            {
                "id": 19,
                "question": "___ (She/He) is my sister.",
                "options": ["She", "He"],
                "answer": ["She", "she", "SHE"],
                "selectedOption": null
            },
            {
                "id": 20,
                "question": "___ (Us) are friends.",
                "options": ["We", "They"],
                "answer": ["We", "WE", "we"],
                "selectedOption": null
            }
        ]
        ,
        paragraphInterpretation: [
            {
                "id": 21,
                "question": "Who is ten years old?",
                "options": ["Anna", "Tom", "Lucy", "John"],
                "answer": ["Tom"],
                "selectedOption": null
            },
            {
                "id": 22,
                "question": "What is the name of Anna's cat?",
                "options": ["Tom", "Lucy", "Whiskers", "John"],
                "answer": ["Whiskers"],
                "selectedOption": null
            },
            {
                "id": 23,
                "question": "How old is Lucy?",
                "options": ["Five", "Ten", "Seven", "Three"],
                "answer": ["Five"],
                "selectedOption": null
            },
            {
                "id": 24,
                "question": "What is the name of Anna's mother?",
                "options": ["Anna", "Mary", "Lucy", "Whiskers"],
                "answer": ["Mary"],
                "selectedOption": null
            },
            {
                "id": 25,
                "question": "Where does Anna live?",
                "options": ["In a big house", "In a small house", "In an apartment", "In a city"],
                "answer": ["In a small house"],
                "selectedOption": null
            }
        ]
        ,

        audioComprehension: [
            {
                id: 100,
                question: " What is Julie's favorite color?",
                options: ["Blue", "Green"],
                answer: "Blue",
                selectedOption: null,
                audio: julie
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
                if (question.questions) {
                    return {
                        ...question,
                        questions: question.questions.map(subQuestion => {
                            if (subQuestion.id === questionId) {
                                return { ...subQuestion, selectedOption };
                            }
                            return subQuestion;
                        }),
                    };
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

                    {!question.questions && (
                        <div className='flex flex-wrap justify-center'>
                            {category === 'fillInTheBlank' || category === 'sentenceCompletion' ? (
                                <input
                                    type="text"
                                    className='py-2 px-4 border-b-2 border-slangup focus:outline-none focus:border-b-2 focus:border-slangup'
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
                    )}
                    {question.questions && question.questions.map(subQuestion => (
                        <div className='my-10' key={subQuestion.id}>
                            <p className='px-7'>{subQuestion.question}</p>
                            <div className='flex flex-wrap justify-center'>
                                {category === 'fillInTheBlank' || category === 'sentenceCompletion' ? (
                                    <input
                                        type="text"
                                        className='py-1 px-4 rounded border-2 border-gray-300 mb-2 mr-2'
                                        value={subQuestion.selectedOption || ''}
                                        onChange={(e) => handleInputChange(category, subQuestion.id, e)}
                                        disabled={submitted}
                                    />
                                ) : (
                                    subQuestion.options.map(option => (
                                        <button
                                            key={option}
                                            className={`py-1 px-5 rounded ${subQuestion.selectedOption === option ? 'bg-green-500' : 'bg-slangup hover:bg-white hover:text-slangup'} text-white font-bold mb-2 mr-2`}
                                            onClick={() => handleAnswer(category, subQuestion.id, option)}
                                            disabled={submitted}
                                            style={{ width: subQuestion.options.length > 2 ? '80%' : '50%' }}
                                        >
                                            {option}
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );


    return (
        <div className='font-custom flex flex-col items-center space-y-3 mb-20'>
            <h1 className='font-semibold text-center px-5 pb-7'>Read each question carefully before answering. Good luck!</h1>
            <FloatingTimer timeLeft={timeLeft} formatTime={formatTime} />

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Multiple Choice Questions</h2>
                <img className='w-[150px]' src={mchoice} alt='' />
            </div>
            {renderQuestions("multipleChoice", questions.multipleChoice)}

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Fill In The Blank</h2>
                <img className='w-[150px]' src={fblank} alt='' />
            </div>
            {renderQuestions("fillInTheBlank", questions.fillInTheBlank)}

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>What's The Error?</h2>
                <img className='w-[150px]' src={errorid} alt='' />
            </div>
            {renderQuestions("errorIdentification", questions.errorIdentification)}

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Complete The Sentence</h2>
                <img className='w-[150px]' src={completion} alt='' />
            </div>
            {renderQuestions("sentenceCompletion", questions.sentenceCompletion)}

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Paragraph Interpretation</h2>
                <img className='w-[150px]' src={reading} alt='' />
            </div>
            <div className='pt-7 '>
                <p className='mb-2 px-10 text-justify font-light text-gray-700'>My name is Anna. I am a student. I have a brother and a sister. My brother's name is Tom. He is ten years old. My sister's name is Lucy. She is five years old. We have a cat. Its name is Whiskers. My parents are very kind. My father's name is John and my mother's name is Mary. We live in a small house. Our house is very cozy. I love my family.</p>
            </div>
            {renderQuestions("paragraphInterpretation", questions.paragraphInterpretation)}


            {/* <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Audio Comprehension</h2>
                <img className='w-[150px]' src={acomprehension} alt='' />
            </div>
            {renderQuestions("audioComprehension", questions.audioComprehension)} */}

            <button onClick={handleSubmit} className=' bg-green-500 hover:bg-white hover:text-slangup text-white font-bold py-2 px-4 rounded mx-auto 
                w-[80%]' disabled={submitted}>
                Submit
            </button>
        </div>
    );
};

export default Quiz;
