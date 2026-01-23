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
      className="w-full max-w-4xl px-8 flex flex-col items-center"
    >
      {/* Stats Header */}
      <div className="absolute top-8 right-8 flex gap-4">
        {coins ? (<div className=" px-4 py-2 flex items-center gap-2">
          <img src="/assets/1768855134283.png" alt="coin" className="w-8 h-8" />
          <span className="text-2xl font-bold">{coins}</span>
        </div>) : null}
        
      {diamonds ? (
        <div className=" px-4 py-2 flex items-center gap-2">
          <img src="/assets/image7.png" alt="diamond" className="w-8 h-8" />
          <span className="text-2xl font-bold">{diamonds}</span>
        </div>) : null}  
      </div>

      {/* Question Card */}
      <div className="orange-frame w-full p-8 mb-8 text-center">
        <h3 className="text-3xl font-bold text-white leading-tight">
          {question.question}
        </h3>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 gap-4 w-full">
        {shuffledOptions.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionSelect(idx)}
            className={`yellow-button p-6 text-xl font-bold text-slate-800 text-left transition-colors
              ${selectedOption === idx ? 'selected orange-frame!' : ''}
              ${isAnswered && idx === shuffledAnswerIndex ? 'bg-green-400! border-green-600!' : ''}
              ${isAnswered && selectedOption === idx && idx !== shuffledAnswerIndex ? 'bg-red-400! border-red-600!' : ''}
            `}
          >
            <span className="inline-block w-8 h-8 rounded-full bg-white/50 text-center mr-4">{idx + 1}</span>
            {option}
          </button>
        ))}
      </div>

      {/* Inactive Arrow until answered */}
      <div className="mt-12 w-full flex justify-end">
        {!isAnswered ? (
          <button 

            onClick={checkAnswer}
            disabled={selectedOption === null}
            className={`px-8 py-4 rounded-2xl text-2xl font-bold text-white transition-all
              ${selectedOption !== null ? 'bg-blue-500 shadow-[0_6px_0_#2563eb] hover:scale-105 active:scale-95' : 'bg-slate-400 cursor-not-allowed opacity-50'}
            `}
          >
            ПЕРЕВІРИТИ
          </button>
        ) : (
             <button 
            onClick={() => nextQuestion(false)}
            className={`next-arrow px-8 py-4 rounded-2xl text-2xl font-bold text-white transition-all  bg-blue-500 shadow-[0_6px_0_#2563eb] hover:scale-105 active:scale-95`}
          >
            ДАЛІ
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default QuizScreen;
