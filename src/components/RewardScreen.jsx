import { motion as Motion } from 'framer-motion';
import { REWARD_TYPES } from '../constants/gameConstants';

const RewardScreen = ({ rewardType, onRestart }) => {
  return (
    <Motion.div
      key="reward"
      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
      className="flex flex-col items-center justify-center"
    >
      {rewardType === REWARD_TYPES.COIN && (
        <div className="coin-anim flex flex-col items-center">
          <img src={`${import.meta.env.BASE_URL}assets/image11-new.png`} alt="Coin" className="w-full h-full md:w-100 md:h-100  drop-shadow-2xl mb-8" />
          <h2 className="text-5xl font-bold text-slate-800 drop-shadow-md">+1</h2>
        </div>
      )}
      {rewardType === REWARD_TYPES.DIAMOND && (
        <div className="coin-anim flex flex-col items-center">
          <img src={`${import.meta.env.BASE_URL}assets/image7-new.png`} alt="Diamond" className="w-full h-full md:w-100 md:h-100  drop-shadow-2xl mb-8" />
          <h2 className="text-5xl font-bold text-slate-800 drop-shadow-md px-8 text-center">ТАК ТРИМАТИ!</h2>
        </div>
      )}
      {rewardType === REWARD_TYPES.TROPHY && (
        <div className="coin-anim flex flex-col items-center text-center">
          <h2 className="text-6xl font-bold text-slate-800 drop-shadow-md mb-8 px-8">ВІТАЄМО!</h2>
          <img src={`${import.meta.env.BASE_URL}assets/win_transparent-new.png`} alt="Trophy" className="animate-bounce w-full h-full md:w-100 drop-shadow-2xl mb-2" />
          <button
            onClick={onRestart}
            className="yellow-button px-12 py-6 text-3xl font-bold text-slate-900 animate-bounce"
          >
            НА ГОЛОВНУ
          </button>
        </div>
      )}
    </Motion.div>
  );
};

export default RewardScreen;
