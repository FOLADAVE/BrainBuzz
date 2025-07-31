import React from "react";
import { Link } from "react-router-dom";
import './QuizHome.css';

const QuizHome = () => {
  return (
    <div className="quiz-home">
      <div className="quiz-container">
        {/* Logo text */}
        <div className="logo-text">
          <h1>BrainBuzz</h1>
          <hr />
        </div>

        {/* Main image */}
        <div className="main-image">
          <img src="/public/brainbuzz.png" alt="BrainBuzz Logo" className="brainbuzz-image" />
        </div>

        {/* CTA button */}
        <div className="cta">
          <Link to="/quiz" style={{ textDecoration: 'none' }}>
  <button>Start Quiz Now</button>
</Link>

        </div>
      </div>
    </div>
  );
};

export default QuizHome;
