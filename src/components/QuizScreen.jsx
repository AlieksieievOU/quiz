import React from 'react';
import { motion } from 'framer-motion';

const QuizScreen = ({
  question,
  shuffledOptions,
  shuffledAnswerIndex,
  selectedOption,
  isAnswered,
  isMuted,
  toggleMute,
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

      {/* Question Card */}
      <div className="orange-frame w-full p-6 md:p-8 mb-8 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          {question.question}
        </h3>
        {question.image && (
          <div className="mt-4 flex justify-center">
            <img
              src={question.image.startsWith('http') ? question.image : `${import.meta.env.BASE_URL}${question.image}`}
              alt={question.question}
              className="max-h-48 md:max-h-64 rounded-lg object-contain shadow-md"
            />
          </div>
        )}
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 gap-3 md:gap-4 w-full">
        {shuffledOptions.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionSelect(idx)}
            className={`yellow-button p-4 md:p-6 text-xl md:text-2xl font-bold text-slate-800 justify-start items-start text-left transition-colors
              ${selectedOption === idx && !isAnswered ? 'selected orange-frame!' : ''}
              ${isAnswered && idx === shuffledAnswerIndex ? 'bg-green-400! border-green-600! correct' : ''}
              ${isAnswered && selectedOption === idx && idx !== shuffledAnswerIndex ? 'bg-red-400! border-red-600! wrong' : ''}
            `}
          >
            <span className="flex min-w-6 min-h-6 items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/50 text-md md:text-lg font-bold">{idx + 1}</span>
            <span>{option}</span>
          </button>
        ))}
      </div>

      {/* Inactive Arrow until answered */}
      <div className="mt-6 md:mt-12 w-full flex justify-between items-center">
        <button
          onClick={toggleMute}
          className="p-4 rounded-full bg-slate-200/50 hover:bg-slate-300/50 transition-colors text-3xl"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>

        {!isAnswered ? (
          <button
            onClick={checkAnswer}
            disabled={selectedOption === null}
            className="blue-button px-8 py-4 text-2xl font-bold"
          >
            ПЕРЕВІРИТИ
          </button>
        ) : (
          <button
            onClick={() => nextQuestion(false)}
            className="blue-button px-8 py-4 text-2xl font-bold next-arrow"
          >
            ДАЛІ
          </button>
        )}
      </div>

      <div className={`mt-4 w-full flex justify-center transition-opacity duration-300 ${isAnswered && selectedOption !== shuffledAnswerIndex ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <a
          href={question.wiki || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="yellow-button px-8 py-4 text-2xl font-bold text-black"
        >
          Повторити Теорію
        </a>
      </div>
    </motion.div>
  );
};

export default QuizScreen;
