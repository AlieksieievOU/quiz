import React, { useEffect, useReducer } from 'react';
import { motion } from 'framer-motion';
import questions1 from './data/questions.json';
import questions2 from './data/questions2.json';

const allQuestions = [...questions1, ...questions2];


import './App.css';

// Sounds
import uiNotificationSound from './assets/sounds/ui_notification.wav';
import uiRejectSound from './assets/sounds/ui_reject.wav';
import uiCoinSound from './assets/sounds/ui_coin.wav';
import uiDiamondSound from './assets/sounds/ui_diamond.wav';
import uiLevelSplashSound from './assets/sounds/ui_notification_2.wav';
import uiWinSound from './assets/sounds/ui_win.mp3';

// Preload sounds
const audioFiles = {
  notification: new Audio(uiNotificationSound),
  reject: new Audio(uiRejectSound),
  coin: new Audio(uiCoinSound),
  diamond: new Audio(uiDiamondSound),
  levelSplash: new Audio(uiLevelSplashSound),
  win: new Audio(uiWinSound),
};

// Set volumes or other properties
Object.values(audioFiles).forEach(audio => {
  audio.preload = 'auto';
  audio.volume = 0.5;
});

// Preload Images
const UI_ASSETS = [
  'bg_transparent.png',
  '1768855134283-new.png',
  'image7-new.png',
  'image11-new.png',
  'win_transparent-new.png',
  'errors.png',
];

const QUESTION_IMAGES = allQuestions
  .filter(q => q.image)
  .map(q => `quiz-images/${q.id}.png`);

const ALL_ASSETS = [...UI_ASSETS, ...QUESTION_IMAGES];

ALL_ASSETS.forEach(src => {
  const img = new Image();
  img.src = `${import.meta.env.BASE_URL}assets/${src}`;
});


function usePrevious(value) {
  const ref = React.useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// Import Screen Components
import StartScreen from './components/StartScreen';
import LevelSplashScreen from './components/LevelSplashScreen';
import QuizScreen from './components/QuizScreen';
import RewardScreen from './components/RewardScreen';
import GameOverScreen from './components/GameOverScreen';

const SCREENS = {
  START: 'start',
  LEVEL_SPLASH: 'level_splash',
  QUIZ: 'quiz',
  REWARD: 'reward',
  GAME_OVER: 'game_over',
  WIN: 'win'
};

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const initialState = {
  screen: SCREENS.START,
  questionIndex: 0,
  coins: 0,
  diamonds: 0,
  selectedOption: null,
  isAnswered: false,
  isCorrect: false,
  rewardType: null, // 'coin', 'diamond', 'trophy'
  totalQuestionsAnswered: 0,
  shuffledOptions: [],
  shuffledAnswerIndex: null,
  isMuted: false,
  errors: 0,
  currentFont: 'Comfortaa',
  sessionQuestions: [],
};


function reducer(state, action) {
  switch (action.type) {
    case 'START_LEVEL': {
      const sessionQuestions = shuffleArray(allQuestions).slice(0, 10);

      const firstQuestion = sessionQuestions[0];
      const options = shuffleArray(firstQuestion.options);
      return {
        ...initialState,
        screen: SCREENS.LEVEL_SPLASH,
        sessionQuestions,
        shuffledOptions: options,
        shuffledAnswerIndex: options.indexOf(firstQuestion.options[firstQuestion.answer]),
      };
    }



    case 'SET_SCREEN':
      return { ...state, screen: action.payload };

    case 'SELECT_OPTION':
      if (state.isAnswered) return state;
      return { ...state, selectedOption: action.payload };

    case 'CHECK_ANSWER': {
      if (state.selectedOption === null) return state;

      const correct = state.shuffledAnswerIndex === state.selectedOption;
      let rewardType = null;

      if (correct) {
        // Calculate potential reward, but don't update coins/diamonds yet
        const nextCoins = state.coins + 1;
        if (nextCoins % 3 === 0 && nextCoins !== 0) {
          rewardType = 'diamond';
        } else {
          rewardType = 'coin';
        }
      }

      return {
        ...state,
        isCorrect: correct,
        isAnswered: true,
        rewardType,
        errors: !correct ? state.errors + 1 : state.errors,
      };
    }

    case 'NEXT_QUESTION': {
      const { fromReward = false } = action.payload || {};

      // If we're coming from the quiz and were correct, apply rewards and show the reward splash
      if (!fromReward && state.isCorrect) {
        let { coins, diamonds, rewardType } = state;

        if (rewardType === 'coin') {
          coins += 1;
        } else if (rewardType === 'diamond') {
          coins += 1;
          diamonds += 1;
        }

        return {
          ...state,
          screen: SCREENS.REWARD,
          coins,
          diamonds
        };
      }

      // Check for Win condition
      if (state.diamonds >= 3) {
        return {
          ...state,
          rewardType: 'trophy',
          screen: SCREENS.REWARD,
        };
      }

      const answeredCount = state.totalQuestionsAnswered + 1;

      // Check for Game Over condition
      if (answeredCount >= 10 && state.diamonds < 3) {
        return {
          ...state,
          totalQuestionsAnswered: answeredCount,
          screen: SCREENS.GAME_OVER,
        };
      }

      // Otherwise, proceed to next question
      const nextIndex = state.questionIndex + 1;
      const currentQuestion = state.sessionQuestions[nextIndex];
      const options = shuffleArray(currentQuestion.options);

      return {
        ...state,
        questionIndex: nextIndex,
        shuffledOptions: options,
        shuffledAnswerIndex: options.indexOf(currentQuestion.options[currentQuestion.answer]),
        totalQuestionsAnswered: answeredCount,
        selectedOption: null,
        isAnswered: false,
        isCorrect: false,
        rewardType: null,
        screen: SCREENS.QUIZ,
      };

    }

    case 'SET_FONT':
      return { ...state, currentFont: action.payload };

    case 'TOGGLE_MUTE':
      return { ...state, isMuted: !state.isMuted };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    screen, questionIndex, coins, diamonds,
    selectedOption, isAnswered, isCorrect, rewardType,
    shuffledOptions, shuffledAnswerIndex, isMuted, errors,
    currentFont
  } = state;

  const toggleMute = () => {
    dispatch({ type: 'TOGGLE_MUTE' });
  };

  // Transition from Splash to Quiz
  useEffect(() => {
    if (screen === SCREENS.LEVEL_SPLASH) {
      const timer = setTimeout(() => dispatch({ type: 'SET_SCREEN', payload: SCREENS.QUIZ }), 2000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  // Handle Reward Persistence
  useEffect(() => {
    if (screen === SCREENS.REWARD) {
      const timer = setTimeout(() => {
        if (rewardType === 'trophy') {
          dispatch({ type: 'SET_SCREEN', payload: SCREENS.WIN });
        } else {
          dispatch({ type: 'NEXT_QUESTION', payload: { fromReward: true } });
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [screen, rewardType]);

  // Handle Reward Sounds
  useEffect(() => {
    if (isMuted) return;
    if (screen === SCREENS.REWARD) {
      if (rewardType === 'coin') {
        audioFiles.coin.currentTime = 0;
        audioFiles.coin.play().catch(e => console.error(e));
      } else if (rewardType === 'diamond') {
        audioFiles.diamond.currentTime = 0;
        audioFiles.diamond.play().catch(e => console.error(e));
      }
    } else if (screen === SCREENS.WIN) {
      audioFiles.win.currentTime = 0;
      audioFiles.win.play().catch(e => console.error(e));
    } else if (screen === SCREENS.GAME_OVER) {
      audioFiles.reject.currentTime = 0;
      audioFiles.reject.play().catch(e => console.error(e));
    } else if (screen === SCREENS.LEVEL_SPLASH) {
      audioFiles.levelSplash.currentTime = 0;
      audioFiles.levelSplash.play().catch(e => console.error(e));
    }
  }, [screen, rewardType, isMuted]);

  // Handle Answer Sounds (Notification/Reject)
  useEffect(() => {
    if (isAnswered && !isMuted) {
      // Delay slightly to not conflict with coin sound
      setTimeout(() => {
        const sound = isCorrect ? audioFiles.notification : audioFiles.reject;
        sound.currentTime = 0;
        sound.play().catch(e => console.error("Audio play failed:", e));
      }, 100);
    }
  }, [isAnswered, isCorrect, isMuted]);

  return (
    <div
      className={`game-container ${screen !== SCREENS.START ? 'bg-linear-to-b from-[#FFF9E1] to-[#F3E2A9]' : ''}`}
      style={{
        fontFamily: currentFont === 'Open Sans' ? 'var(--font-open-sans)' : 
                    currentFont === 'Andika' ? 'var(--font-andika)' : 
                    'var(--font-comfortaa)',
        ...(screen === SCREENS.START ? { backgroundImage: `url('${import.meta.env.BASE_URL}assets/bg_transparent.png')` } : {})
      }}
    >

   <div className="flex items-center gap-2 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-lg z-50">
        {['Comfortaa', 'Open Sans', 'Andika'].map(font => (
          <button
            key={font}
            onClick={() => dispatch({ type: 'SET_FONT', payload: font })}
            className={`px-3 py-1 rounded-md text-sm font-bold cursor-pointer transition-colors ${currentFont === font ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-white/50 text-slate-700'}`}
            style={{ fontFamily: font === 'Open Sans' ? 'var(--font-open-sans)' : font === 'Andika' ? 'var(--font-andika)' : 'var(--font-comfortaa)' }}
          >
            {font.split(' ')[0]}
          </button>
        ))}
      </div>
   

      {screen !== SCREENS.START && (
        <div className="top-0 right-4 md:right-8 flex gap-2 md:gap-4 z-50">



          {errors > 0 ? (
          <div className="px-2 md:px-4 py-2 flex items-center gap-2 text-red-600">
            
           <img src={`${import.meta.env.BASE_URL}assets/errors.png`} alt="errors" className="w-12 md:w-20" />
            <span className="text-xl md:text-3xl font-bold">{errors}</span>
          </div>
        ) : null}

          {coins ? (
            <div className="px-2 md:px-4 py-2 flex items-center gap-2">
              <img src={`${import.meta.env.BASE_URL}assets/1768855134283-new.png`} alt="coin" className="w-12 h-12 md:w-20 md:h-20" />
              <span className="text-xl md:text-3xl font-bold">{coins}</span>
            </div>
          ) : null}

          {diamonds ? (
            <div className="px-2 md:px-4 py-2 flex items-center gap-2">
              <img src={`${import.meta.env.BASE_URL}assets/image7-new.png`} alt="diamond" className="w-14 h-14 md:w-22 md:h-22" />
              <span className="text-xl md:text-3xl font-bold">{diamonds}</span>
            </div>
          ) : null}
        </div>
      )}

      <div style={{ display: screen === SCREENS.START ? "flex" : "none", width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <StartScreen onStart={() => dispatch({ type: 'START_LEVEL' })} />
      </div>

      <div style={{ display: screen === SCREENS.LEVEL_SPLASH ? "flex" : "none", width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <LevelSplashScreen />
      </div>

      {screen === SCREENS.QUIZ && state.sessionQuestions[questionIndex] && (
        <div className="w-full h-full flex justify-center">
          <QuizScreen
            question={state.sessionQuestions[questionIndex]}
            shuffledOptions={shuffledOptions}
            shuffledAnswerIndex={shuffledAnswerIndex}
            selectedOption={selectedOption}
            isAnswered={isAnswered}
            isMuted={isMuted}
            toggleMute={toggleMute}
            handleOptionSelect={(idx) => dispatch({ type: 'SELECT_OPTION', payload: idx })}
            checkAnswer={() => dispatch({ type: 'CHECK_ANSWER' })}
            nextQuestion={() => dispatch({ type: 'NEXT_QUESTION' })}
          />
        </div>
      )}


      <div style={{ display: (screen === SCREENS.REWARD || screen === SCREENS.WIN) ? "flex" : "none", width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <RewardScreen rewardType={rewardType} onRestart={() => dispatch({ type: 'SET_SCREEN', payload: SCREENS.START })} />
      </div>

      <div style={{ display: screen === SCREENS.GAME_OVER ? "flex" : "none", width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <GameOverScreen onRestart={() => dispatch({ type: 'SET_SCREEN', payload: SCREENS.START })} />
      </div>

      {/* Force Preload Images */}
      <div className="hidden">
        {ALL_ASSETS.map(src => <img key={src} src={`${import.meta.env.BASE_URL}assets/${src}`} alt="preload" />)}
      </div>

    </div>
  );
}

export default App;
