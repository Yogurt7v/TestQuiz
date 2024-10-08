import { useState } from 'react'
import { IQuizCardProps, QuizQuestion, } from './types/types'
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export function QuizCard({ database, setResult, setCurrentPage, currentPage }: IQuizCardProps) {
  const [currentAnswer, setCurrentAnswer] = useState(0 as number | string | number[])
  const checkboxAnswers = [] as number[]

  const { question, answers, correctAnswer, type }: QuizQuestion = database


  const checkAnswer = () => {

    if (type === "text") {

      if (String(currentAnswer).toLowerCase().trim() === String(correctAnswer).toLowerCase()) {
        setResult((prev: number) => prev + 1)
        setCurrentPage(currentPage + 1)
        setCurrentAnswer(0)
      }

      setCurrentPage(currentPage + 1)
    }

    if (type === "checkbox") {

      if (JSON.stringify(checkboxAnswers) === JSON.stringify(correctAnswer)) {
        setResult((prev: number) => prev + 1)
        setCurrentPage(currentPage + 1)
        setCurrentAnswer(0)
      }
    }

    if (type === "radio") {

      if (currentAnswer == correctAnswer) {
        setResult((prev: number) => prev + 1)
        setCurrentPage(currentPage + 1)
        setCurrentAnswer(0)
      }

      setCurrentPage(currentPage + 1)
    }

    setCurrentAnswer(0)
    setCurrentPage(currentPage + 1)
  }

  switch (type) {
    case "radio":
      return (
        <>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">{question}</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={currentAnswer}
            >
              {answers.map((answer, index) => (
                <FormControlLabel
                  key={index}
                  value={answer}
                  control={<Radio />}
                  label={answer}
                  onChange={(e) => setCurrentAnswer((e.target as HTMLInputElement).value)}
                />
              ))}
            </RadioGroup>
            <Button variant="contained" onClick={checkAnswer}>Далее</Button>
          </FormControl>
        </>

      )
    case "checkbox":
      return (
        <>
          <FormLabel id="demo-radio-buttons-group-label">{question}</FormLabel>
          <FormGroup>
            {answers.map((answerOption, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox />}
                value={index}
                label={answerOption}
                onChange={(event) => {
                  const target = event.target as HTMLInputElement;
                  const value = parseInt(target.value);
                  if (target.checked) {
                    checkboxAnswers.push(value);
                  } else {
                    const index = checkboxAnswers.indexOf(value);
                    if (index > -1) {
                      checkboxAnswers.splice(index, 1);
                    }
                  }
                }}

              />
            ))}
            <Button variant="contained" onClick={checkAnswer}>Далее</Button>
          </FormGroup>
        </>
      )

    case "text":
      return (
        <>
          <div>
            <FormLabel id="demo-radio-buttons-group-label">{question}</FormLabel>
            <Box
              component="form"
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                id="outlined-required"
                label="Required"
                onChange={(e) => setCurrentAnswer(e.target.value)}
              />
            </Box>
          </div>
          <Button variant="contained" onClick={checkAnswer}>Далее</Button>
        </>
      )
  }

}

export default QuizCard