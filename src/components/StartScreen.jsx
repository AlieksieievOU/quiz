import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const StartScreen = ({ onStart }) => {
  return (
    <motion.div
      key="start"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col items-center animate-float"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-12 drop-shadow-[0_5px_0_rgba(0,0,0,0.3)] ">
        Музична Гра
      </h1>
      <button
        onClick={onStart}
        className="group relative w-24 h-24 yellow-button flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
      >
        <Play size={48} fill="white" color="white" />

      </button>
      <span className="mt-12 text-3xl font-bold text-white drop-shadow-md">ПОЧАТИ</span>
    </motion.div>
  );
};

export default StartScreen;
