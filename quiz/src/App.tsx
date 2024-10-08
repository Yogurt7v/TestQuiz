import { useEffect, useState } from 'react'
import './App.css'
import QuizCard from './components/quizCard'
import Result from './components/result'
import db from './database/db.json'
import LinearWithValueLabel from './components/progressBar'


function App() {
  const [currentPage, setCurrentPage] = useState(0)
  const [result, setResult] = useState(0)

  useEffect(() => {
    const page = Number(window.localStorage.getItem("page"))
    const answer = Number(window.localStorage.getItem("answers"))

    if (page !== 0) {
      setCurrentPage(page)
    }

    if (answer !== 0) {
      setResult(answer)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem("page", String(currentPage))
    window.localStorage.setItem("answers", String(result))
  }, [currentPage, result])


  if (db[currentPage] === undefined) {
    return (
      <>
        <div className="App">
          <Result correctAnswer={result} db={db} setCurrentPage={setCurrentPage} setResult={setResult} />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="App">
        <h1>Quiz</h1>
        <LinearWithValueLabel
          progress={((currentPage / db.length) * 100)}
        />
        {currentPage <= db.length && <QuizCard database={db[currentPage]} currentPage={currentPage} setResult={setResult} setCurrentPage={setCurrentPage} />}
      </div>
    </>
  )
}

export default App
