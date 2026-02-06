import { motion as Motion } from 'framer-motion';
import { useState } from 'react';

const DragMatchQuestion = ({
  question,
  userMatches,
  draggedItem,
  isAnswered,
  onDragStart,
  onDragEnd,
  onDrop,
}) => {
  const [hoveredSlot, setHoveredSlot] = useState(null);
  const [touchDraggedItem, setTouchDraggedItem] = useState(null);
  const [touchPosition, setTouchPosition] = useState(null);

  const handleDragOver = (e, slotId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setHoveredSlot(slotId);
  };

  const handleDragLeave = () => {
    setHoveredSlot(null);
  };

  const handleDrop = (e, slotId) => {
    e.preventDefault();
    setHoveredSlot(null);
    onDrop(slotId);
  };

  // Touch event handlers for mobile support
  const handleTouchStart = (e, itemId) => {
    if (isAnswered) return;
    const touch = e.touches[0];
    setTouchDraggedItem(itemId);
    setTouchPosition({ x: touch.clientX, y: touch.clientY });
    onDragStart(itemId);
  };

  const handleTouchMove = (e) => {
    if (!touchDraggedItem || isAnswered) return;
    e.preventDefault(); // Prevent scrolling while dragging
    
    const touch = e.touches[0];
    setTouchPosition({ x: touch.clientX, y: touch.clientY });
    
    const elementAtPoint = document.elementFromPoint(touch.clientX, touch.clientY);
    
    // Find the closest drop zone
    const dropZone = elementAtPoint?.closest('[data-drop-zone]');
    if (dropZone) {
      const slotId = dropZone.getAttribute('data-slot-id');
      setHoveredSlot(slotId);
    } else {
      setHoveredSlot(null);
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchDraggedItem || isAnswered) return;
    
    const touch = e.changedTouches[0];
    const elementAtPoint = document.elementFromPoint(touch.clientX, touch.clientY);
    
    // Find the closest drop zone
    const dropZone = elementAtPoint?.closest('[data-drop-zone]');
    if (dropZone) {
      const slotId = dropZone.getAttribute('data-slot-id');
      onDrop(slotId);
    }
    
    setTouchDraggedItem(null);
    setTouchPosition(null);
    setHoveredSlot(null);
    onDragEnd();
  };

  // Get the dragged item for the preview
  const draggedSourceItem = touchDraggedItem 
    ? question.sourceImages.find(item => item.id === touchDraggedItem)
    : null;

  return (
    <div className="w-full grid grid-cols-[auto_1fr] gap-12 mt-6 items-start">
      {/* Source Images (Draggable) - 1 Column */}
      <div className="grid grid-cols-1 gap-3 auto-rows-fr">
       
        {question.sourceImages.map((item) => {
          const isMatched = userMatches.some(m => m.source === item.id);
          const isDragging = draggedItem === item.id || touchDraggedItem === item.id;
          return (
            <Motion.div
              key={item.id}
              draggable={!isAnswered}
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = 'move';
                onDragStart(item.id);
              }}
              onDragEnd={onDragEnd}
              onTouchStart={(e) => handleTouchStart(e, item.id)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              whileHover={!isAnswered ? { scale: 1.02 } : {}}
              className={`yellow-button p-4 flex items-center justify-center gap-3 transition-all duration-200 min-h-32
                ${!isAnswered ? 'cursor-move hover:shadow-lg' : 'cursor-default'}
                ${isMatched ? 'opacity-40' : 'opacity-100'}
                ${isDragging ? 'opacity-30 scale-95' : ''}
              `}
            >
              <img 
                src={`${import.meta.env.BASE_URL}assets/quiz-images-match/${item.src}`}
                alt={item.label}
                className="w-16 h-16 md:w-20 md:h-20 object-contain pointer-events-none"
              />
            </Motion.div>
          );
        })}
      </div>

      {/* Target Slots (Drop Zones) - Full Width */}
      <div className="grid grid-cols-1 gap-3 auto-rows-fr w-full">
       
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
            <div key={slot.id} className='flex flex-row w-full gap-4 items-center min-h-32'>
              <Motion.div
                data-drop-zone="true"
                data-slot-id={slot.id}
                onDragOver={(e) => handleDragOver(e, slot.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, slot.id)}
                whileHover={!isAnswered && (draggedItem || touchDraggedItem) ? { scale: 1.02 } : {}}
                className={`yellow-button-dashed flex-1 p-4 flex items-center justify-center gap-3 transition-all duration-200 min-h-32
                  ${!isAnswered && (draggedItem || touchDraggedItem) && hoveredSlot === slot.id ? 'drag-over' : ''}
                  ${isAnswered && isCorrectMatch ? 'correct' : ''}
                  ${isAnswered && isWrongMatch ? 'wrong' : ''}
                `}
              >
                {/* Matched Item Display or Empty State */}
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
                  </Motion.div>
                ) : (
                  !isAnswered && (
                    <></>
                  )
                )}
              </Motion.div>
          
              {/* Target Image */}
              <img 
                src={`${import.meta.env.BASE_URL}assets/quiz-images-match/${slot.src}`}
                alt={slot.label}
                className="w-16 h-16 md:w-20 md:h-20 object-contain shrink-0"
              />
            </div>
          );
        })}
      </div>

      {/* Touch Drag Preview - follows finger on mobile */}
      {touchPosition && draggedSourceItem && (
        <div
          style={{
            position: 'fixed',
            left: touchPosition.x,
            top: touchPosition.y,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 1000,
          }}
          className="yellow-button p-4 opacity-80 shadow-2xl"
        >
          <img 
            src={`${import.meta.env.BASE_URL}assets/quiz-images-match/${draggedSourceItem.src}`}
            alt={draggedSourceItem.label}
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default DragMatchQuestion;
