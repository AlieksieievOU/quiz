import { motion as Motion } from 'framer-motion';

const DragMatchQuestion = ({
  question,
  userMatches,
  draggedItem,
  isAnswered,
  onDragStart,
  onDragEnd,
  onDrop,
}) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  return (
    <div className="w-full grid grid-cols-2 gap-5 mt-6">
      {/* Source Images (Draggable) */}
      <div className="space-y-3">
       
        {question.sourceImages.map((item) => {
          const isMatched = userMatches.some(m => m.source === item.id);
          return (
            <Motion.div
              key={item.id}
              draggable={!isAnswered}
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = 'move';
                onDragStart(item.id);
              }}
              onDragEnd={onDragEnd}
              whileHover={!isAnswered ? { scale: 1.02 } : {}}
              className={`yellow-button p-4 flex items-center gap-3 transition-all duration-200
                ${!isAnswered ? 'cursor-move hover:shadow-lg' : 'cursor-default'}
                ${isMatched ? 'opacity-40' : 'opacity-100'}
                ${draggedItem === item.id ? 'opacity-30 scale-95' : ''}
              `}
            >
              <img 
                src={`${import.meta.env.BASE_URL}assets/quiz-images-match/${item.src}`}
                alt={item.label}
                className="w-16 h-16 md:w-20 md:h-20 object-contain pointer-events-none"
              />
              {/* <span className="text-lg md:text-xl font-bold text-slate-800">{item.label}</span> */}
            </Motion.div>
          );
        })}
      </div>

      {/* Target Slots (Drop Zones) */}
      <div className="space-y-3">
       
        {question.targetSlots.map((slot) => {
          const match = userMatches.find(m => m.target === slot.id);
          const sourceItem = match ? 
            question.sourceImages.find(s => s.id === match.source) : null;
          
          // Check if this match is correct
          const isCorrectMatch = isAnswered && match && question.answer.some(
            a => a.source === match.source && a.target === slot.id
          );
          const isWrongMatch = isAnswered && match && !isCorrectMatch;
          
          return (
            <Motion.div
              key={slot.id}
              onDragOver={handleDragOver}
              onDrop={(e) => {
                e.preventDefault();
                onDrop(slot.id);
              }}
              whileHover={!isAnswered && draggedItem ? { scale: 1.02 } : {}}
              className={`yellow-button-dashed p-4 flex items-center gap-3 transition-all duration-200
                ${!isAnswered && draggedItem ? 'ring-2 ring-orange-500 ring-opacity-50' : ''}
                ${isAnswered && isCorrectMatch ? 'bg-green-400/30 border-green-600 border-4' : ''}
                ${isAnswered && isWrongMatch ? 'bg-red-400/30 border-red-600 border-4' : ''}
              `}
            >
              <div className="flex items-center justify-between gap-4">
                {/* Target Image */}
                <img 
                  src={`${import.meta.env.BASE_URL}assets/quiz-images-match/${slot.src}`}
                  alt={slot.label}
                  className="w-16 h-16 md:w-20 md:h-20 object-contain"
                />

                {/* Matched Item Display or Empty State */}
                <div className="flex-1 flex items-center justify-center">
                  {sourceItem ? (
                    <Motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <img 
                        src={`${import.meta.env.BASE_URL}assets/quiz-images-match/${sourceItem.src}`}
                        alt={sourceItem.label}
                        className="w-12 h-12 md:w-16 md:h-16 object-contain"
                      />
                      {isAnswered && (
                        <span className="text-3xl">
                          {isCorrectMatch ? '✓' : '✗'}
                        </span>
                      )}
                    </Motion.div>
                  ) : (
                    !isAnswered && (
                      <div className="w-full text-center text-white/50 text-2xl border-2 border-dashed border-white/30 rounded-lg p-4">
                        ?
                      </div>
                    )
                  )}
                </div>
              </div>
            </Motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DragMatchQuestion;
