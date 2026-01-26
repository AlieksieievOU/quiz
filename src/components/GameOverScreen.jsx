import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

const GameOverScreen = ({ onRestart }) => {
  return (
    <motion.div 
      key="gameover"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="flex flex-col w-full bg-black/60 backdrop-blur-xl p-16 sm:mx-2 md:mx-4 lg:mx-6 max-w-[375px] mx-auto rounded-[2rem] border-8 border-slate-700 max-w-lg text-center"
    >
       <RefreshCw size={100} className="text-slate-400 mb-8" />
       <h2 className="text-5xl font-bold text-white mb-4">СПРОБУЙ ЩЕ</h2>
       <p className="text-slate-300 mb-12 text-xl">Наберіть 3 діаманти за 60 запитань, щоб виграти!</p>
       <button 
        onClick={onRestart}
        className="px-12 py-6 yellow-button text-3xl font-bold text-slate-900"
      >
        НА ГОЛОВНУ
      </button>
    </motion.div>
  );
};

export default GameOverScreen;
