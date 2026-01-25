import React from 'react';
import { motion } from 'framer-motion';

const RewardScreen = ({ rewardType, onRestart }) => {
  return (
    <motion.div
      key="reward"
      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
      className="flex flex-col items-center justify-center"
    >
      {rewardType === 'coin' && (
        <div className="coin-anim flex flex-col items-center">
          <img src={`${import.meta.env.BASE_URL}assets/image11-new.png`} alt="Coin" className="w-full h-full md:w-100 md:h-100  drop-shadow-2xl mb-8" />
          <h2 className="text-5xl font-bold text-slate-800 drop-shadow-md">+1</h2>
        </div>
      )}
      {rewardType === 'diamond' && (
        <div className="coin-anim flex flex-col items-center">
          <img src={`${import.meta.env.BASE_URL}assets/image7-new.png`} alt="Diamond" className="w-full h-full md:w-100 md:h-100  drop-shadow-2xl mb-8" />
          <h2 className="text-5xl font-bold text-slate-800 drop-shadow-md px-8">ТАК ТРИМАТИ! ДІАМАНТ!</h2>
        </div>
      )}
      {rewardType === 'trophy' && (
        <div className="coin-anim flex flex-col items-center text-center">
          <h2 className="text-6xl font-bold text-slate-800 drop-shadow-md mb-8 px-8">ВІТАЄМО ВАС! ВИГРАШ!</h2>
          <img src={`${import.meta.env.BASE_URL}assets/win-transparent-new.png`} alt="Trophy" className="w-full h-full md:w-100 drop-shadow-2xl mb-8" />
          <button
            onClick={onRestart}
            className="px-12 py-6 yellow-button text-3xl font-bold text-slate-900 hover:scale-110 active:scale-95 transition-transform"
          >
            НА ГОЛОВНУ
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default RewardScreen;
