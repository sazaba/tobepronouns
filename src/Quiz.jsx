import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingTimer from './FloatingTimer';
import questionMark from './assets/question.webp'
import questionAudio from './assets/audio.webp'
import questionAudio1 from './assets/julie.mp3'
import questionAudio2 from './assets/questionAudio2.mp3'
import videosup from './assets/videosup.png'
import YouTube from 'react-youtube';
import mchoice from './assets/mchoice.png'



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



    const [questions, setQuestions] = useState([

        {
            id: 1,
            question: "___ is my friend. (He/She)",
            options: ["He", "She"],
            answer: "She",
            selectedOption: null
        },
        {
            id: 2,
            question: "___ are going to the party. (We/They)",
            options: ["We", "They"],
            answer: "They",
            selectedOption: null
        },
        {
            id: 3,
            question: "Give it to ___. (Me/You)",
            options: ["Me", "You"],
            answer: "Me",
            selectedOption: null
        },
        {
            id: 4,
            question: "___ can't believe it! (I/You)",
            options: ["I", "You"],
            answer: "I",
            selectedOption: null
        },
        {
            id: 5,
            question: "___ cat is sleeping on the sofa. (The/A)",
            options: ["The", "A"],
            answer: "The",
            selectedOption: null
        },
        {
            id: 6,
            question: "I want ___ apple. (An/The)",
            options: ["An", "The"],
            answer: "An",
            selectedOption: null
        },
        {
            id: 7,
            question: "___ dog is barking loudly. (A/The)",
            options: ["A", "The"],
            answer: "A",
            selectedOption: null
        },
        {
            id: 8,
            question: "Do you have ___ time to talk? (Some/Any)",
            options: ["Some", "Any"],
            answer: "Any",
            selectedOption: null
        },
        {
            id: 9,
            question: "___ did you arrive home last night? (When/How)",
            options: ["When", "How"],
            answer: "When",
            selectedOption: null
        },
        {
            id: 10,
            question: "___ are you feeling today? (When/How)",
            options: ["When", "How"],
            answer: "How",
            selectedOption: null
        },
        {
            id: 11,
            question: "___ did you learn to play the piano? (When/How)",
            options: ["When", "How"],
            answer: "How",
            selectedOption: null
        },
        {
            id: 12,
            question: "___ do you usually go to bed? (When/How)",
            options: ["When", "How"],
            answer: "When",
            selectedOption: null
        },
        {
            id: 13,
            question: "___ two books on the table. (There is/There are)",
            options: ["There is", "There are"],
            answer: "There are",
            selectedOption: null
        },
        {
            id: 14,
            question: "___ a lot of people waiting outside. (There is/There are)",
            options: ["There is", "There are"],
            answer: "There are",
            selectedOption: null
        },
        {
            id: 15,
            question: "___ a park near my house. (There is/There are)",
            options: ["There is", "There are"],
            answer: "There is",
            selectedOption: null
        },
        {
            id: 16,
            question: "___ some milk in the fridge. (There is/There are)",
            options: ["There is", "There are"],
            answer: "There is",
            selectedOption: null
        },
        {
            id: 17,
            question: "She ___ a doctor. (Is/Isn't)",
            options: ["Is", "Isn't"],
            answer: "Is",
            selectedOption: null
        },
        {
            id: 18,
            question: "They ___ at home right now. (Are/Aren't)",
            options: ["Are", "Aren't"],
            answer: "Are",
            selectedOption: null
        },
        {
            id: 19,
            question: "You ___ very kind. (Are/Aren't)",
            options: ["Are", "Aren't"],
            answer: "Are",
            selectedOption: null
        },
        {
            id: 20,
            question: "I ___ a student. (Am/Isn't)",
            options: ["Am", "Isn't"],
            answer: "Am",
            selectedOption: null
        },
        {
            id: 21,
            question: "We'll meet ___ the restaurant. (In/On/At)",
            options: ["In", "On", "At"],
            answer: "At",
            selectedOption: null
        },
        {
            id: 22,
            question: "The concert starts ___ 7 PM. (In/On/At)",
            options: ["In", "On", "At"],
            answer: "At",
        },
        {
            id: 23,
            question: "She arrived ___ the airport early. (In/On/At)",
            options: ["In", "On", "At"],
            answer: "At",
            selectedOption: null
        },
        {
            id: 24,
            question: "My birthday is ___ May. (In/On/At)",
            options: ["In", "On", "At"],
            answer: "In",
            selectedOption: null
        },
        {
            id: 25,
            question: "___ apples are there in the basket? (How much/How many)",
            options: ["How much", "How many"],
            answer: "How many",
            selectedOption: null
        },
        {
            id: 26,
            question: "___ water do you need? (How much/How many)",
            options: ["How much", "How many"],
            answer: "How much",
            selectedOption: null
        },
        {
            id: 27,
            question: "___ books did you read last month? (How much/How many)",
            options: ["How much", "How many"],
            answer: "How many",
            selectedOption: null
        },
        {
            id: 28,
            question: "___ money do you have in your wallet? (How much/How many)",
            options: ["How much", "How many"],
            answer: "How much",
            selectedOption: null
        },
        {
            id: 29,
            question: "She ___ speak French fluently. (Can/Can't)",
            options: ["Can", "Can't"],
            answer: "Can",
            selectedOption: null
        },
        {
            id: 30,
            question: "___ you play the guitar? (Can/Can't)",
            options: ["Can", "Can't"],
            answer: "Can",
            selectedOption: null
        },
        {
            id: 31,
            question: "He ___ swim since he was a child. (Can/Can't)",
            options: ["Can", "Can't"],
            answer: "Can",
            selectedOption: null
        },
        {
            id: 32,
            question: "We ___ help you with that. (Can/Can't)",
            options: ["Can", "Can't"],
            answer: "Can",
            selectedOption: null
        },
        {
            id: 33,
            question: "She ___ to work every day. (Goes/Go)",
            options: ["Goes", "Go"],
            answer: "Goes",
            selectedOption: null
        },
        {
            id: 34,
            question: "He ___ coffee in the morning. (Drink/Drinks)",
            options: ["Drink", "Drinks"],
            answer: "Drinks",
            selectedOption: null
        },
        {
            id: 35,
            question: "They ___ soccer on Sundays. (Play/Plays)",
            options: ["Play", "Plays"],
            answer: "Play",
            selectedOption: null
        },
        {
            id: 36,
            question: "It ___ cold in the winter. (Is/Are)",
            options: ["Is", "Are"],
            answer: "Is",
            selectedOption: null
        },
        {
            id: 37,
            question: "She has a ___ car. (Red/Big)",
            options: ["Red", "Big"],
            answer: "Red",
            selectedOption: null
        },
        {
            id: 38,
            question: "He lives in a ___ house. (Small/Beautiful)",
            options: ["Beautiful", "Small"],
            answer: "Beautiful",
            selectedOption: null
        },
        {
            id: 39,
            question: "They bought ___ shoes yesterday. (New/Old)",
            options: ["New", "Old"],
            answer: "New",
            selectedOption: null
        },
        {
            id: 40,
            question: "The cake tastes ___ . (Good/Bad)",
            options: ["Good", "Bad"],
            answer: "Good",
            selectedOption: null
        },
        {
            id: 41,
            question: "You ___ see a doctor if you're not feeling well. (Should/Shouldn't)",
            options: ["Should", "Shouldn't"],
            answer: "Should",
            selectedOption: null
        },
        {
            id: 42,
            question: "We ___ leave early to avoid traffic. (Should/Shouldn't)",
            options: ["Should", "Shouldn't"],
            answer: "Should",
            selectedOption: null
        },
        {
            id: 43,
            question: "He ___ study more for the exam. (Should/Shouldn't)",
            options: ["Should", "Shouldn't"],
            answer: "Should",
            selectedOption: null
        },
        {
            id: 44,
            question: "They ___ listen to their parents' advice. (Should/Shouldn't)",
            options: ["Should", "Shouldn't"],
            answer: "Should",
            selectedOption: null
        },
        {
            id: 45,
            question: "She ___ TV right now. (Watch/Watching)",
            options: ["Watch", "Watching"],
            answer: "Is watching",
            selectedOption: null
        },
        {
            id: 46,
            question: "They ___ dinner at the moment. (Eat/Eating)",
            options: ["Eat", "Are Eating"],
            answer: "Are eating",
            selectedOption: null
        },
        {
            id: 47,
            question: "He ___ to the gym every day. (Goes/Going)",
            options: ["Goes", "Going"],
            answer: "Goes",
            selectedOption: null
        },
        {
            id: 48,
            question: "It ___ outside. (Rains/Is raining)",
            options: ["Rains", "Is raining"],
            answer: "Is raining",
            selectedOption: null
        },
        {
            id: 49,
            question: "___ did you go last weekend? (Where/What)",
            options: ["Where", "What"],
            answer: "Where",
            selectedOption: null
        },
        {
            id: 50,
            question: "___ is your favorite movie? (Where/What)",
            options: ["Where", "What"],
            answer: "What",
            selectedOption: null
        },
        {
            id: 51,
            question: "___ did you buy that book? (Where/What)",
            options: ["Where", "What"],
            answer: "Where",
            selectedOption: null
        },
        {
            id: 52,
            question: "___ are you from? (Where/What)",
            options: ["Where", "What"],
            answer: "Where",
            selectedOption: null
        },
        {
            id: 53,
            question: "This is ___ book. (My/His)",
            options: ["My", "His"],
            answer: "My",
            selectedOption: null
        },
        {
            id: 54,
            question: "___ dog is very friendly. (My/Their)",
            options: ["My", "Their"],
            answer: "Their",
            selectedOption: null
        },
        {
            id: 55,
            question: "___ car is parked over there. (His/Our)",
            options: ["His", "Our"],
            answer: "His",
            selectedOption: null
        },
        {
            id: 56,
            question: "___ house is big. (Her/Our)",
            options: ["Her", "Our"],
            answer: "Our",
            selectedOption: null
        },
        {
            id: 57,
            question: "I ___ like to visit Japan someday. (Would/Wouldn't)",
            options: ["Would", "Wouldn't"],
            answer: "Would",
            selectedOption: null
        },
        {
            id: 58,
            question: "She ___ prefer tea over coffee. (Would/Wouldn't)",
            options: ["Would", "Wouldn't"],
            answer: "Would",
            selectedOption: null
        },
        {
            id: 59,
            question: "They ___ love to travel. (Would/Wouldn't)",
            options: ["Would", "Wouldn't"],
            answer: "Would",
            selectedOption: null
        },
        {
            id: 60,
            question: "He ___ help you if you ask. (Would/Wouldn't)",
            options: ["Would", "Wouldn't"],
            answer: "Would",
            selectedOption: null
        },
        {
            id: 61,
            question: "___ color do you prefer, red or blue? (What/Which)",
            options: ["What", "Which"],
            answer: "Which",
            selectedOption: null
        },
        {
            id: 62,
            question: "___ is your favorite TV show? (What/Which)",
            options: ["What", "Which"],
            answer: "What",
            selectedOption: null
        },
        {
            id: 63,
            question: "___ book are you reading right now? (What/Which)",
            options: ["What", "Which"],
            answer: "Which",
            selectedOption: null
        },
        {
            id: 64,
            question: "___ one do you want, this or that? (What/Which)",
            options: ["What", "Which"],
            answer: "Which",
            selectedOption: null
        },
        {
            id: 65,
            question: "___ she like ice cream? (Do/Does)",
            options: ["Do", "Does"],
            answer: "Does",
            selectedOption: null
        },
        {
            id: 66,
            question: "___ they go to school by bus? (Do/Does)",
            options: ["Do", "Does"],
            answer: "Do",
            selectedOption: null
        },
        {
            id: 67,
            question: "___ you have any siblings? (Do/Does)",
            options: ["Do", "Does"],
            answer: "Do",
            selectedOption: null
        },
        {
            id: 68,
            question: "___ he speak English fluently? (Do/Does)",
            options: ["Do", "Does"],
            answer: "Does",
            selectedOption: null
        },
        {
            id: 69,
            question: "___ is your best friend? (Who/Why)",
            options: ["Who", "Why"],
            answer: "Who",
            selectedOption: null
        },
        {
            id: 70,
            question: "___ did you come to the party? (Who/Why)",
            options: ["Who", "Why"],
            answer: "Why",
            selectedOption: null
        },
        {
            id: 71,
            question: "___ did you choose that option? (Who/Why)",
            options: ["Who", "Why"],
            answer: "Why",
            selectedOption: null
        },
        {
            id: 72,
            question: "___ is she crying? (Who/Why)",
            options: ["Who", "Why"],
            answer: "Why",
            selectedOption: null
        },
        {
            id: 73,
            question: "___ is my book. (This/That)",
            options: ["This", "That"],
            answer: "This",
            selectedOption: null
        },
        {
            id: 74,
            question: "___ are my shoes. (This/That)",
            options: ["This", "That"],
            answer: "These",
            selectedOption: null
        },
        {
            id: 75,
            question: "___ are my friends. (These/Those)",
            options: ["These", "Those"],
            answer: "These",
            selectedOption: null
        },
        {
            id: 76,
            question: "___ are my parents. (These/Those)",
            options: ["These", "Those"],
            answer: "Those",
            selectedOption: null
        },
        {
            id: 77,
            question: `Jane is a high school student who loves to read. Every evening, after finishing her homework, she spends at least an hour reading her favorite books. She believes that reading not only helps her relax but also improves her vocabulary and comprehension skills. Jane's favorite genres are fantasy and science fiction, but she also enjoys historical novels from time to time. What does Jane do after finishing her homework?`,
            options: ["Listen to music.", "Play video games.", "Read her favorite books.", "Watch television."],
            answer: "Read her favorite books.",
            selectedOption: null
        },
        {
            id: 78,
            question: "Why does Jane believe reading is important?",
            options: ["Because it helps her socialize.", "Because it allows her to improve her athletic skills.", "Because it helps her relax and improves her vocabulary and comprehension skills.", "Because it gives her more free time."],
            answer: "Because it helps her relax and improves her vocabulary and comprehension skills.",
            selectedOption: null
        },
        {
            id: 79,
            question: "What genres of books does Jane prefer?",
            options: ["Mystery and crime novels.", "Science fiction and fantasy.", "Poetry and drama.", "Non-fiction books and autobiographies."],
            answer: "Science fiction and fantasy.",
            selectedOption: null
        },
        {
            id: 80,
            question: "What is the main purpose of this paragraph?",
            options: ["Introduce a character named Jane.", "Describe Jane's daily activities.", "Discuss the benefits of reading for Jane.", "Explain how Jane spends her free time."],
            answer: "Discuss the benefits of reading for Jane.",
            selectedOption: null
        },
        {
            id: 81,
            question: "What does Jane do when she finishes her school duties?",
            options: ["Plays sports.", "Spends time with friends.", "Reads her favorite books.", "Helps at home with household chores."],
            answer: "Reads her favorite books.",
            selectedOption: null
        },




        // Puedes agregar más preguntas aquí...
    ]);

    const handleAnswer = (questionId, selectedOption) => {
        const updatedAnswers = { ...answers, [questionId]: selectedOption };
        setAnswers(updatedAnswers);

        const updatedQuestions = questions.map(question => {
            if (question.id === questionId) {
                return { ...question, selectedOption };
            }
            return question;
        });
        setQuestions(updatedQuestions);
    };

    const handleSubmit = () => {
        let correctAnswers = 0;
        questions.forEach(question => {
            if (answers[question.id] === question.answer) {
                correctAnswers += 1;
            }
        });

        const newScore = correctAnswers;
        setScore(newScore);

        const percentage = (correctAnswers / questions.length) * 100;

        // Navegar a la página de resultados con el puntaje y el porcentaje
        navigate('/results', { state: { score: newScore, percentage: percentage } });
    };


    return (
        <div className='font-custom flex flex-col items-center space-y-3 mb-20'>
            <h1 className='font-semibold text-center px-5'>Read each question carefully before answering. Good luck!</h1>
            <FloatingTimer timeLeft={timeLeft} formatTime={formatTime} />
            <div className='bg-slangup rounded-md'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Multiple Choice Questions</h2>
                <img src={mchoice} alt='' />
            </div>


            {questions.map(question => (
                <div className='text-center text-black bg-white shadow-xl rounded-lg p-10 w-[80%]' key={question.id}>
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
                                videoId="cVsyJvxX48A" // El ID del video de YouTube
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
                                onClick={() => handleAnswer(question.id, option)}
                                disabled={submitted}
                                style={{ width: question.options.length > 2 ? '100%' : '50%' }}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
            <button onClick={handleSubmit} className=' bg-lime-400 hover:bg-white hover:text-slangup text-white font-bold py-2 px-4 rounded mx-auto 
                w-[80%]' disabled={submitted}>
                Submit
            </button>
        </div>
    );
};

export default Quiz;

