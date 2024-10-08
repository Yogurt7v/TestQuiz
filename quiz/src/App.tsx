import { useEffect, useState } from 'react'
import './App.css'
import QuizCard from './components/quizCard'
import Result from './components/result'
import db from './database/db.json'
import LinearWithValueLabel from './components/progressBar'
import { TIME } from './components/constants/const'


function App() {
  const [currentPage, setCurrentPage] = useState(0)
  const [result, setResult] = useState(0)
  const [timeleft, setTimeleft] = useState(TIME)

  useEffect(() => {
    const page = Number(window.localStorage.getItem("page"))
    const answer = Number(window.localStorage.getItem("answers"))
    const time = Number(window.localStorage.getItem("time"))
    setTimeleft(time)

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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeleft > 0) {
        setTimeleft(timeleft - 1)
      }
      window.localStorage.setItem("time", String(timeleft))
    }, 1000)
    return () => clearTimeout(timer)
  }, [timeleft])


  if (db[currentPage] === undefined || timeleft === 0) {
    return (
      <>
        <div className="App">
          <Result correctAnswer={result} db={db} setCurrentPage={setCurrentPage} setResult={setResult} setTimeleft={setTimeleft} />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="App">
        <h1>Quiz</h1>
        <div>Осталось времени: {timeleft}</div>
        <LinearWithValueLabel
          progress={((currentPage / db.length) * 100)}
        />
        {currentPage <= db.length && <QuizCard database={db[currentPage]} currentPage={currentPage} setResult={setResult} setCurrentPage={setCurrentPage} />}
      </div>
    </>
  )
}

export default App
