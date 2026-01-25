import React from 'react';
import { motion } from 'framer-motion';

const QuizScreen = ({
  question,
  shuffledOptions,
  shuffledAnswerIndex,
  coins,
  diamonds,
  selectedOption,
  isAnswered,
  handleOptionSelect,
  checkAnswer,
  nextQuestion
}) => {
  return (
    <motion.div
      key="quiz"
      initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -300, opacity: 0 }}
      className="w-full pt-16 md:pt-22 lg:pt-0 max-w-4xl px-4 md:px-8 flex flex-col items-center"
    >
      {/* Stats Header */}
      <div className="absolute top-0 right-4 md:right-8 flex gap-2 md:gap-4">
        {coins ? (<div className=" px-2 md:px-4 py-2 flex items-center gap-2">
          <img src="/assets/1768855134283-new.png" alt="coin" className="w-12 h-12 md:w-20 md:h-20" />
          <span className="text-xl md:text-2xl font-bold">{coins}</span>
        </div>) : null}

        {diamonds ? (
          <div className=" px-2 md:px-4 py-2 flex items-center gap-2">
            <img src="/assets/image7-new.png" alt="diamond" className="w-14 h-14 md:w-22 md:h-22" />
            <span className="text-xl md:text-2xl font-bold">{diamonds}</span>
          </div>) : null}
      </div>

      {/* Question Card */}
      <div className="orange-frame w-full p-6 md:p-8 mb-8 text-center">
        <h3 className="text-xl md:text-3xl font-bold text-white leading-tight">
          {question.question}
        </h3>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 gap-3 md:gap-4 w-full">
        {shuffledOptions.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionSelect(idx)}
            className={`yellow-button p-4 md:p-6 text-lg md:text-xl font-bold text-slate-800 text-left transition-colors
              ${selectedOption === idx && !isAnswered ? 'selected orange-frame!' : ''}
              ${isAnswered && idx === shuffledAnswerIndex ? 'bg-green-400! border-green-600! correct' : ''}
              ${isAnswered && selectedOption === idx && idx !== shuffledAnswerIndex ? 'bg-red-400! border-red-600! wrong' : ''}
            `}
          >
            <span className="inline-block w-6 h-6 md:w-8 md:h-8 md:lh-8 lh-6 rounded-full bg-white/50 text-center text-sm md:text-base">{idx + 1}</span>
            <span>{option}</span>
          </button>
        ))}
      </div>

      {/* Inactive Arrow until answered */}
      <div className="mt-6 md:mt-12 w-full flex justify-end">
        {!isAnswered ? (
          <button

            onClick={checkAnswer}
            disabled={selectedOption === null}
            className={`px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl text-xl md:text-2xl font-bold text-white transition-all
              ${selectedOption !== null ? 'bg-blue-500 shadow-[0_4px_0_#2563eb] md:shadow-[0_6px_0_#2563eb] hover:scale-105 active:scale-95' : 'bg-slate-400 cursor-not-allowed opacity-50'}
            `}
          >
            ПЕРЕВІРИТИ
          </button>
        ) : (
          <button
            onClick={() => nextQuestion(false)}
            className={`next-arrow px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl text-xl md:text-2xl font-bold text-white transition-all  bg-blue-500 shadow-[0_4px_0_#2563eb] md:shadow-[0_6px_0_#2563eb] hover:scale-105 active:scale-95`}
          >
            ДАЛІ
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default QuizScreen;
