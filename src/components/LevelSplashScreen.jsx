import React from 'react';
import { motion } from 'framer-motion';

const LevelSplashScreen = () => {
  return (
    <motion.div 
      key="splash"
      initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.5, opacity: 0 }}
      className="flex flex-col items-center bg-white/20 backdrop-blur-md p-12 rounded-md border-4 border-white/50"
    >
      <h2 className="text-5xl font-bold text-black drop-shadow-xl text-center">
        ПЕРШИЙ<br/>РІВЕНЬ
      </h2>
    </motion.div>
  );
};

export default LevelSplashScreen;
