import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

const GameOverScreen = ({ onRestart }) => {
  return (
    <motion.div 
      key="gameover"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="flex flex-col w-full  flex-center items-center justify-center p-16 sm:mx-4 md:mx-4 lg:mx-6 mx-auto text-center"
    >
       <RefreshCw size={100} className="text-black mb-8 mx-auto" />
       <h2 className="text-5xl font-bold text-black mb-4">СПРОБУЙ ЩЕ</h2>
       <p className="text-black mb-12 text-xl">Наберіть 3 діаманти за 60 запитань, щоб виграти!</p>
       <button 
        onClick={onRestart}
        className="px-12 py-6 yellow-button text-3xl font-bold text-slate-900 text-center mx-auto"
      >
        НА ГОЛОВНУ
      </button>
    </motion.div>
  );
};

export default GameOverScreen;
