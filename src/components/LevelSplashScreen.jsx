import { motion as Motion } from 'framer-motion';

const LevelSplashScreen = ({ level }) => {
  const levelNames = {
    1: "ПЕРШИЙ",
    2: "ДРУГИЙ",
    3: "ТРЕТІЙ"
  };

  return (
    <Motion.div 
      key={`splash-${level}`}
      initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.5, opacity: 0 }}
      className="flex flex-col items-center bg-white/20 backdrop-blur-md p-12 rounded-md border-4 border-white/50"
    >
      <h2 className="text-5xl font-bold text-black drop-shadow-xl text-center">
        {levelNames[level] || "НАСТУПНИЙ"}<br/>РІВЕНЬ
      </h2>
    </Motion.div>
  );
};

export default LevelSplashScreen;
