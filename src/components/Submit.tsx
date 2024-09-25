
"use client"
import React, { useState, useEffect } from "react"
import { fetchQuestions,fetchAnswers, submitAnswers } from "@/service/api.service"
const Submit: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([])
  const [answers, setAnswers] = useState<any[]>([])
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({})
  const [result, setResult] = useState<any>()

  useEffect(() => {
    const getQuestionsAndAnswers = async () => {
      try {
        const questionsData = await fetchQuestions()
        const answersData = await fetchAnswers()

        setQuestions(questionsData)
        setAnswers(answersData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    getQuestionsAndAnswers()
  }, [])

  const handleOptionChange = (questionId: number, optionText: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionText
    }))
  }

  const handleSubmit = async () => {
    const allQuestionsAnswered = questions.every(question =>
      selectedAnswers.hasOwnProperty(question.id) &&
      selectedAnswers[question.id] !== ''
    )

    if (allQuestionsAnswered) {
      const result = await submitAnswers(selectedAnswers)
      setResult(result)
    } else {
      alert("Please answer all questions.")
    }
  }

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index} className="question">
          <h3>{question.questionText}</h3>
          <div className="options">
            {answers
              .filter(answer => question.options.includes(answer.id))
              .map((option, idx) => (
                <label key={idx}>
                  <input
                    type="radio"
                    name={question.id}
                    value={option.optionText}
                    checked={selectedAnswers[question.id] === option.optionText}
                    onChange={() => handleOptionChange(question.id, option.optionText)}
                  />
                  {option.optionText}
                </label>
              ))}
          </div>
        </div>
      ))}
      <button onClick={handleSubmit}>LET'S GO</button>

      {result && (
        <div className="result-popup">
          <div className="content">
            <h3>Sport that suits you the best is:</h3>
            <p>{result?.data[0]?.resultText}</p>
            <button onClick={() => setResult(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Submit
