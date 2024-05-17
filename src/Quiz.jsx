
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
                id: 11,
                question: "She don't like to eat vegetables.",
                options: ["Don’t", "Like", "Eat"],
                answer: "Don’t",
                selectedOption: null
            },
            {
                id: 12,
                question: "John and his's dog went for a walk yesterday.",
                options: ["Went", "His's", "Walk"],
                answer: "His's",
                selectedOption: null
            },
            {
                id: 13,
                question: "We go to the beach on every Mondays.",
                options: ["On every Monday", "We go to", "Mondays"],
                answer: "On every Monday",
                selectedOption: null
            },
            {
                id: 14,
                question: "Can you pass me an pen, please?",
                options: ["Can", "Pass me", "An"],
                answer: "An",
                selectedOption: null
            },
            {
                id: 15,
                question: "Her are going to the movie tonight.",
                options: ["Are", "Her", "Going"],
                answer: "Her",
                selectedOption: null
            },
        ],
        sentenceCompletion: [
            {
                id: 16,
                question: "Sarah ___ (to like) ice cream.",
                options: ["likes", "liking"],
                answer: ["likes", "Likes"],
                selectedOption: null
            },
            {
                id: 17,
                question: "We ___ (to be) at the park yesterday.",
                options: ["were", "was"],
                answer: ["were", "Were"],
                selectedOption: null
            },
            {
                id: 18,
                question: "She ___ (to have) a red bike.",
                options: ["has", "have"],
                answer: ["has", "Has"],
                selectedOption: null
            },
            {
                id: 19,
                question: "They ___ (to go) to school every day.",
                options: ["go", "goes"],
                answer: ["go", "Go"],
                selectedOption: null
            },
        ],
        paragraphInterpretation: [
            {
                id: 21,
                question: "Who has a collection of books in their room?",
                options: ["Samantha", "Jack", "Both", "Neither"],
                answer: "Samantha",
                selectedOption: null
            },
            {
                id: 22,
                question: "What does Jack keep in his bedroom?",
                options: ["Books", "Headphones", "Guitar", "None of the above"],
                answer: "Guitar",
                selectedOption: null
            },
            {
                id: 23,
                question: "What does Samantha borrow from Jack?",
                options: ["Books", "Guitar", "Headphones", "None of the above"],
                answer: "Headphones",
                selectedOption: null
            }


        ],

        paragraphInterpretation2: [

            {
                id: 25,
                question: "What does Jane do after finishing her homework?",
                options: ["Listen to music", "Play video games", "Read her favorite books", "Watch television"],
                answer: "Read her favorite books",
                selectedOption: null
            },
            {
                id: 26,
                question: "Why does Jane believe reading is important?",
                options: ["Because it helps her socialize", "Because it allows her to improve her athletic skills", "Because it helps her relax and improves her vocabulary and comprehension skills", "Because it gives her more free time"],
                answer: "Because it helps her relax and improves her vocabulary and comprehension skills",
                selectedOption: null
            },
            {
                id: 27,
                question: "What genres of books does Jane prefer?",
                options: ["Mystery and crime novels", "Science fiction and fantasy", "Poetry and drama", "Non-fiction books and autobiographies"],
                answer: "Science fiction and fantasy",
                selectedOption: null
            },
            {
                id: 28,
                question: "What is the main purpose of this paragraph?",
                options: ["Introduce a character named Jane", "Describe Jane's daily activities", "Discuss the benefits of reading for Jane", "Explain how Jane spends her free time"],
                answer: "Discuss the benefits of reading for Jane",
                selectedOption: null
            },
            {
                id: 29,
                question: "What does Jane do when she finishes her school duties?",
                options: ["Plays sports", "Spends time with friends", "Reads her favorite books", "Helps at home with household chores"],
                answer: "Reads her favorite books",
                selectedOption: null
            }

        ],

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
                <p className='mb-2 px-5 text-justify font-medium'>Samantha and Jack are siblings. Samantha loves to read, so she has a collection of books in her room. Jack, on the other hand, is passionate about music, and he keeps his guitar in his bedroom. Samantha often borrows Jack's headphones to listen to music while she reads, but she always returns them to him afterward. Both of them cherish their hobbies and respect each other's belongings.</p>
            </div>
            {renderQuestions("paragraphInterpretation", questions.paragraphInterpretation)}


            <div>
                <p className='mb-2 px-5 text-justify font-medium'>Jane is a high school student who loves to read. Every evening, after finishing her homework, she spends at least an hour reading her favorite books. She believes that reading not only helps her relax but also improves her vocabulary and comprehension skills. Jane's favorite genres are fantasy and science fiction, but she also enjoys historical novels from time to time."</p>
            </div>
            {renderQuestions("paragraphInterpretation2", questions.paragraphInterpretation2)}



            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Audio Comprehension</h2>
                <img className='w-[150px]' src={acomprehension} alt='' />
            </div>
            {renderQuestions("audioComprehension", questions.audioComprehension)}

            <button onClick={handleSubmit} className=' bg-green-500 hover:bg-white hover:text-slangup text-white font-bold py-2 px-4 rounded mx-auto 
                w-[80%]' disabled={submitted}>
                Submit
            </button>
        </div>
    );
};

export default Quiz;
