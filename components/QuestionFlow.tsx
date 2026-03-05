'use client'

import { useState } from 'react'
import { type Question } from '@/lib/questions'

interface Props {
  questions: Question[]
  onComplete: (answers: string[]) => void
  submitting?: boolean
}

const LETTERS = ['A', 'B', 'C', 'D', 'E']

export default function QuestionFlow({ questions, onComplete, submitting }: Props) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''))
  const [selected, setSelected] = useState<string>('')

  const question = questions[current]
  const isLast = current === questions.length - 1

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

  return (
    <div className="flex flex-col gap-8 w-full max-w-lg mx-auto">

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">
            Question {current + 1} <span className="text-zinc-500 font-normal">/ {questions.length}</span>
          </span>
          <span className="text-xs text-zinc-500">{Math.round((current / questions.length) * 100)}%</span>
        </div>
        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-rose-500 to-violet-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(current / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question — clearly the prompt, not a card */}
      <div className="space-y-1">
        <p className="text-xs text-zinc-500 font-medium">Answer honestly</p>
        <h2 className="text-2xl sm:text-3xl font-bold leading-snug text-white">
          {question.text}
        </h2>
      </div>

      {/* Options — clearly the choices */}
      <div className="flex flex-col gap-3">
        <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Pick one</p>
        {question.options.map((option, i) => {
          const isChosen = selected === option
          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`w-full text-left flex items-center gap-4 px-4 py-4 rounded-2xl border transition-all duration-150 group
                ${isChosen
                  ? 'border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/10'
                  : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-600 hover:bg-zinc-800/60'
                }`}
            >
              {/* Letter badge */}
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-all
                ${isChosen
                  ? 'bg-violet-500 text-white'
                  : 'bg-zinc-800 text-zinc-500 group-hover:bg-zinc-700 group-hover:text-zinc-300'
                }`}>
                {LETTERS[i]}
              </span>

              {/* Option text */}
              <span className={`text-sm font-medium leading-snug transition-colors
                ${isChosen ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                {option}
              </span>

              {/* Check indicator */}
              {isChosen && (
                <span className="ml-auto shrink-0 text-violet-400">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        {current > 0 && (
          <button
            onClick={handleBack}
            className="px-5 py-3.5 rounded-xl border border-zinc-800 text-zinc-500 text-sm font-medium hover:border-zinc-600 hover:text-zinc-300 transition"
          >
            &larr; Back
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!selected || submitting}
          className={`flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all
            ${selected && !submitting
              ? 'bg-linear-to-r from-rose-500 to-violet-600 text-white hover:opacity-90 shadow-lg shadow-rose-500/20'
              : 'bg-zinc-800/50 text-zinc-500 cursor-not-allowed border border-zinc-800'
            }`}
        >
          {submitting ? 'Submitting...' : isLast ? 'See the result \u2192' : 'Next question \u2192'}
        </button>
      </div>
    </div>
  )
}
