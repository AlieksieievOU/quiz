import { motion as Motion } from 'framer-motion';
import { Play } from 'lucide-react';

const StartScreen = ({ onStart }) => {
  return (
    <Motion.div
      key="start"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col items-center animate-float"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-black-100 mb-12 ">
        Музична Гра
      </h1>
      <button
        onClick={onStart}
        className="group relative w-28 h-28 yellow-button items-center justify-center"
      >
        <Play size={48} fill="white" color="white" />

      </button>
      <span className="mt-12 text-3xl font-bold text-black-100 drop-shadow-md">ПОЧАТИ</span>
    </Motion.div>
  );
};

export default StartScreen;
