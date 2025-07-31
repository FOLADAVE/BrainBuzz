import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QuizHome from './Components/Home/QuizHome';
import Quiz from './Components/Quiz/Quiz';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<QuizHome />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  );
};

export default App;
