import React from 'react';
import { motion } from 'framer-motion';

const RewardScreen = ({ rewardType }) => {
  return (
    <motion.div 
      key="reward"
      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
      className="flex flex-col items-center justify-center"
    >
      {rewardType === 'coin' && (
        <div className="coin-anim flex flex-col items-center">
          <img src="/assets/image11.png" alt="Coin" className="w-64 h-64 drop-shadow-2xl mb-8" />
          <h2 className="text-5xl font-bold text-yellow-100 drop-shadow-md">+1</h2>
        </div>
      )}
      {rewardType === 'diamond' && (
        <div className="coin-anim flex flex-col items-center">
          <img src="/assets/image7.png" alt="Diamond" className="w-64 h-64 drop-shadow-2xl mb-8" />
          <h2 className="text-5xl font-bold text-blue-100 drop-shadow-md">ТАК ТРИМАТИ! ДІАМАНТ!</h2>
        </div>
      )}
      {rewardType === 'trophy' && (
        <div className="coin-anim flex flex-col items-center text-center">
          <img src="/assets/image8.png" alt="Trophy" className="w-80 h-80 drop-shadow-2xl mb-8" />
          <h2 className="text-6xl font-bold text-yellow-300 drop-shadow-md">ВІТАЄМО ВАС! ВИГРАШ!</h2>
        </div>
      )}
    </motion.div>
  );
};

export default RewardScreen;
