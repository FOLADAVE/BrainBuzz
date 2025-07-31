import React, { useRef, useState } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';
import { useNavigate } from 'react-router-dom';

const correctSound = new Audio('/sounds/correct.mp3');
const wrongSound = new Audio('/sounds/incorrect.mp3');


const Quiz = () => {
  const navigate = useNavigate();

  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (!lock) {
        if (question.ans === ans) {
            e.target.classList.add("correct");
            setScore(prev => prev + 1);
            correctSound.play(); // ✅ Play correct sound
        } else {
            e.target.classList.add("wrong");
            option_array[question.ans - 1].current.classList.add("correct");
            wrongSound.play(); // ✅ Play wrong sound
        }
        setLock(true);
    }
};


  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      setIndex(prev => prev + 1);
      setQuestion(data[index + 1]);
      setLock(false);
      option_array.forEach(option => {
        option.current.classList.remove("correct", "wrong");
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setLock(false);
    setScore(0);
    setResult(false);
    navigate('/');
  };

  const progressPercentage = ((index + 1) / data.length) * 100;

  return (
    <div className='container'>
      <h1>BrainBuzz</h1>
      <hr />

      {!result ? (
        <>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="question-tracker">
            Question {index + 1} of {data.length}
          </div>

          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
          </ul>
          <button onClick={next}>Next</button>
        </>
      ) : (
        <div className="result-box">
          <h2 className="result-title">Quiz Completed!</h2>
          <p className="result-score">
            You scored <strong>{score}</strong> out of <strong>{data.length}</strong>
          </p>
          <div className="result-image">
            {score === data.length ? (
              <img src="/src/assets/trophy.png" alt="Perfect Score" className="trophy-img" />
            ) : score >= data.length / 2 ? (
              <img src="/src/assets/clap.png" alt="Good Job" />
            ) : (
              <img src="/src/assets/try-again.png" alt="Try Again" />
            )}
          </div>
          <p className="result-message">
            {score === data.length
              ? "Perfect! You're a genius!"
              : score >= data.length / 2
              ? "Great job! You did well."
              : "Keep trying! You'll improve."}
          </p>
          <button className="reset-button" onClick={reset}>Try Again</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
