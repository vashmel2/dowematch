'use client'

import { useState } from 'react'
import { type Question } from '@/lib/questions'

interface Props {
  questions: Question[]
  onComplete: (answers: string[]) => void
  submitting?: boolean
}

export default function QuestionFlow({ questions, onComplete, submitting }: Props) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''))
  const [selected, setSelected] = useState<string>('')

  const question = questions[current]
  const progress = ((current) / questions.length) * 100

  function handleSelect(option: string) {
    setSelected(option)
  }

  function handleNext() {
    if (!selected) return
    const newAnswers = [...answers]
    newAnswers[current] = selected
    setAnswers(newAnswers)

    if (current < questions.length - 1) {
      setCurrent(current + 1)
      setSelected(newAnswers[current + 1] || '')
    } else {
      onComplete(newAnswers)
    }
  }

  function handleBack() {
    if (current === 0) return
    const newAnswers = [...answers]
    newAnswers[current] = selected
    setAnswers(newAnswers)
    setCurrent(current - 1)
    setSelected(newAnswers[current - 1] || '')
  }

  const isLast = current === questions.length - 1

  return (
    <div className="flex flex-col gap-6 w-full max-w-lg mx-auto">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-zinc-500">
          <span>Question {current + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-rose-500 to-violet-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 min-h-[80px] flex items-center">
        <h2 className="text-lg font-semibold leading-snug">{question.text}</h2>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {question.options.map((option) => {
          const isChosen = selected === option
          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all
                ${isChosen
                  ? 'border-violet-500 bg-violet-500/10 text-white'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-600 hover:text-white'
                }`}
            >
              {option}
            </button>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
        {current > 0 && (
          <button
            onClick={handleBack}
            className="px-5 py-3 rounded-xl border border-zinc-700 text-zinc-400 text-sm font-medium hover:border-zinc-500 hover:text-white transition"
          >
            Back
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!selected || submitting}
          className={`flex-1 py-3 rounded-xl text-sm font-semibold transition
            ${selected && !submitting
              ? 'bg-linear-to-r from-rose-500 to-violet-600 text-white hover:opacity-90'
              : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
            }`}
        >
          {submitting ? 'Submitting...' : isLast ? 'See the result' : 'Next'}
        </button>
      </div>
    </div>
  )
}
