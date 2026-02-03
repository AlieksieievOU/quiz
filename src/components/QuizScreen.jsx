import { motion as Motion } from 'framer-motion';
import DragMatchQuestion from './DragMatchQuestion';

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
  nextQuestion,
  userMatches,
  draggedItem,
  handleDragStart,
  handleDragEnd,
  handleDrop,
}) => {
  if (!question) return null;

  return (

    <Motion.div
      key="quiz"
      initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -300, opacity: 0 }}
      className="w-full max-h-full overflow-y-auto pt-8 pb-12 md:pt-12 lg:pt-8 max-w-4xl px-4 md:px-8 flex flex-col items-center scrollbar-hide"
    >

      {/* Question Card */}
      <div className="orange-frame w-full p-4 md:p-6 mb-4 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          {question.question}
        </h3>
       
      </div>
 {question.image && (
          <div className="mt-4 mb-4 flex justify-center">
            <img
              src={`${import.meta.env.BASE_URL}assets/quiz-images/${question.image || `${question.id}.png`}`}
              alt={question.question}
              className="max-h-48 md:max-h-64 rounded-md object-contain shadow-md"
            />
          </div>
        )}
      {/* Question Content - Conditional based on type */}
      {(() => {
        console.log('Question type:', question.type, 'Full question:', question);
        return question.type === 'drag-match';
      })() ? (
        <DragMatchQuestion
          question={question}
          userMatches={userMatches}
          draggedItem={draggedItem}
          isAnswered={isAnswered}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
        />
      ) : (
        /* Options Grid for regular questions */
        <div className="grid grid-cols-1 gap-3 md:gap-3 w-full">
          {shuffledOptions.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionSelect(idx)}
              className={`yellow-button cursor-pointer p-2 md:p-3 text-xl md:text-2xl font-bold text-slate-800 justify-start items-start text-left transition-colors
                ${selectedOption === idx && !isAnswered ? 'selected orange-frame!' : ''}
                ${isAnswered && idx === shuffledAnswerIndex ? 'bg-green-400! border-green-600! correct' : ''}
                ${isAnswered && selectedOption === idx && idx !== shuffledAnswerIndex ? 'bg-red-400! border-red-600! wrong' : ''}
              `}
            >
              <span className="flex min-w-6 min-h-6 items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-md bg-white/50 text-md md:text-lg font-bold">{idx + 1}</span>
              <span>{option}</span>
            </button>
          ))}
        </div>
      )}

      {/* Inactive Arrow until answered */}
      <div className="mt-6 md:mt-12 w-full flex justify-between items-center">
        <div className="flex gap-2">
            <button
            onClick={() => {
              localStorage.removeItem('quiz_game_state_v2');
              window.location.href = '/';
            }}
            className="yellow-button px-4 py-1 text-2xl font-bold next-arrow cursor-pointer"
            title="Reset and go home"
          >
            🏠
          </button>
          <button
            onClick={toggleMute}
            className="yellow-button px-4 py-1 text-2xl font-bold next-arrow cursor-pointer"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
          
        
        </div>

        {!isAnswered ? (
          <button
            onClick={checkAnswer}
            disabled={
              question.type === 'drag-match' 
                ? !userMatches || userMatches.length !== question.answer.length
                : selectedOption === null
            }
            className="blue-button px-4 py-2 text-2xl font-bold next-arrow cursor-pointer"
          >
            ПЕРЕВІРИТИ
          </button>
        ) : (
          <button
            onClick={() => nextQuestion(false)}
            className="blue-button px-4 py-2 text-2xl font-bold next-arrow cursor-pointer"
          >
            ДАЛІ
          </button>
        )}
      </div>

      <div className="hidden">
      <div className={`mt-4 w-full flex justify-center transition-opacity duration-300 ${isAnswered && selectedOption !== shuffledAnswerIndex ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
              <a
                href={question.wiki || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="yellow-button px-4 py-2 text-lg font-bold text-black"
              >
                Повторити Теорію
              </a>
            </div>
      </div>
      
        </Motion.div>
  );
};

export default QuizScreen;
