import { useEffect, useState } from 'react';
import './App.css';
import QuizCard from './components/quizCard';
import Result from './components/result';
import db from './database/db.json';
import LinearWithValueLabel from './components/progressBar';
import { TIME } from './components/constants/const';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [result, setResult] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME);

  useEffect(() => {
    const page = Number(window.localStorage.getItem('page'));
    const answer = Number(window.localStorage.getItem('answers'));
    const time = Number(window.localStorage.getItem('time'));
    setTimeLeft(time);

    if (page !== 0) {
      setCurrentPage(page);
    }

    if (answer !== 0) {
      setResult(answer);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('page', String(currentPage));
    window.localStorage.setItem('answers', String(result));
  }, [currentPage, result]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
      window.localStorage.setItem('time', String(timeLeft));
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  if (db[currentPage] === undefined || timeLeft === 0) {
    return (
      <div className="AppWrapper">
        <div className="App">
          <Result
            correctAnswer={result}
            db={db}
            setCurrentPage={setCurrentPage}
            setResult={setResult}
            setTimeLeft={setTimeLeft}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="AppWrapper">
      <div className="App">
        <h1>Quiz</h1>
        <div>Осталось времени: {timeLeft}</div>
        <LinearWithValueLabel progress={(currentPage / db.length) * 100} />
        {currentPage <= db.length && (
          <QuizCard
            database={db[currentPage]}
            currentPage={currentPage}
            setResult={setResult}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}

export default App;
