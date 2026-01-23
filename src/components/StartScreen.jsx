import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const StartScreen = ({ onStart }) => {
  return (
    <motion.div 
      key="start"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col items-center"
    >
      <h1 className="text-6xl font-bold text-white mb-12 drop-shadow-[0_5px_0_rgba(0,0,0,0.3)] animate-float">
        Музична Гра
      </h1>
      <button 
        onClick={onStart}
        className="group relative w-48 h-48 yellow-button flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
      >
        <Play size={80} fill="white" color="white" className="ml-2 drop-shadow-lg" />
        <span className="absolute -bottom-12 text-3xl font-bold text-white drop-shadow-md">ПОЧАТИ</span>
      </button>
    </motion.div>
  );
};

export default StartScreen;
