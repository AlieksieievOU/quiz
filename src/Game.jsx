import { useEffect } from 'react';
import './App.css';

// Constants & Utilities
import { SCREENS, GAME_CONFIG, REWARD_TYPES } from './constants/gameConstants';
import { preloadAssets, playSound, UI_ASSETS } from './utils/assetManager';
import { 
  initGA, 
  trackQuizStart, 
  trackQuizComplete, 
  trackIncorrectAnswer, 
  trackCorrectAnswer,
  trackLevelProgress,
  trackReward,
  saveErrorStat
} from './utils/analytics';

// Hooks
import { useGameState } from './hooks/useGameState';

// Screen Components
import StartScreen from './components/StartScreen';
import LevelSplashScreen from './components/LevelSplashScreen';
import QuizScreen from './components/QuizScreen';
import RewardScreen from './components/RewardScreen';
import GameOverScreen from './components/GameOverScreen';

// Analytics Testing (Development only)
import './utils/analyticsTest';

// Preload Images on module load
preloadAssets();

function Game() {
  const [state, actions] = useGameState();
  const {
    screen, questionIndex, coins, diamonds,
    selectedOption, isAnswered, isCorrect, rewardType,
    shuffledOptions, shuffledAnswerIndex, isMuted, errors,
    currentLevel, sessionQuestions
  } = state;

  // Initialize Google Analytics on mount
  useEffect(() => {
    initGA();
  }, []);

  // Track quiz start
  useEffect(() => {
    if (screen === SCREENS.LEVEL_SPLASH) {
      trackQuizStart(currentLevel);
      trackLevelProgress(currentLevel);
    }
  }, [screen, currentLevel]);

  // Track answers (correct/incorrect)
  useEffect(() => {
    if (isAnswered && sessionQuestions[questionIndex]) {
      const question = sessionQuestions[questionIndex];
      const selectedAnswer = shuffledOptions[selectedOption];
      const correctAnswer = shuffledOptions[shuffledAnswerIndex];
      
      if (isCorrect) {
        trackCorrectAnswer(question.id, question.question);
      } else {
        trackIncorrectAnswer(
          question.id, 
          question.question, 
          selectedAnswer, 
          correctAnswer, 
          currentLevel
        );
        saveErrorStat(question.id, question.question);
      }
    }
  }, [isAnswered, isCorrect, questionIndex, sessionQuestions, shuffledOptions, selectedOption, shuffledAnswerIndex, currentLevel]);

  // Track rewards
  useEffect(() => {
    if (screen === SCREENS.REWARD && rewardType) {
      trackReward(rewardType, coins, diamonds);
    }
  }, [screen, rewardType, coins, diamonds]);

  // Track quiz completion
  useEffect(() => {
    if (screen === SCREENS.WIN || screen === SCREENS.GAME_OVER) {
      const outcome = screen === SCREENS.WIN ? 'win' : 'game_over';
      trackQuizComplete(outcome, { coins, diamonds, errors });
    }
  }, [screen, coins, diamonds, errors]);

  // Transition from Splash to Quiz
  useEffect(() => {
    if (screen === SCREENS.LEVEL_SPLASH) {
      const timer = setTimeout(() => actions.setScreen(SCREENS.QUIZ), GAME_CONFIG.LEVEL_SPLASH_DURATION);
      return () => clearTimeout(timer);
    }
  }, [screen, actions]);

  // Handle Reward Persistence
  useEffect(() => {
    if (screen === SCREENS.REWARD) {
      const timer = setTimeout(() => {
        if (rewardType === REWARD_TYPES.TROPHY) {
          actions.setScreen(SCREENS.WIN);
        } else {
          actions.nextQuestion(true);
        }
      }, GAME_CONFIG.REWARD_DURATION);
      return () => clearTimeout(timer);
    }
  }, [screen, rewardType, actions]);

  // Handle Reward & Ambient Sounds
  useEffect(() => {
    if (isMuted) return;

    if (screen === SCREENS.REWARD) {
      if (rewardType === REWARD_TYPES.COIN) playSound('coin', isMuted);
      else if (rewardType === REWARD_TYPES.DIAMOND) playSound('diamond', isMuted);
    } 
    else if (screen === SCREENS.WIN) playSound('win', isMuted);
    else if (screen === SCREENS.GAME_OVER) playSound('reject', isMuted);
    else if (screen === SCREENS.LEVEL_SPLASH) playSound('levelSplash', isMuted);
  }, [screen, rewardType, isMuted]);

  // Handle Answer Sounds (Success/Failure)
  useEffect(() => {
    if (isAnswered && !isMuted) {
      // Delay slightly to not conflict with reward sounds if applicable
      const timer = setTimeout(() => {
        playSound(isCorrect ? 'notification' : 'reject', isMuted);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAnswered, isCorrect, isMuted]);

  return (
    <div
      className={`game-container ${screen !== SCREENS.START ? 'bg-linear-to-b from-[#FFF9E1] to-[#F3E2A9]' : ''}`}
      style={{
        fontFamily: 'var(--font-open-sans)',
        ...(screen === SCREENS.START ? { backgroundImage: `url('${import.meta.env.BASE_URL}assets/bg_transparent.png')` } : {})
      }}
    >
      {/* HUD / Stats */}
      {screen !== SCREENS.START && (
        <div className="top-0 right-4 md:right-8 flex gap-2 md:gap-4 z-50">
          {errors > 0 && (
            <div className="px-2 md:px-4 py-2 flex items-center gap-2">
              <img src={`${import.meta.env.BASE_URL}assets/errors.png`} alt="errors" className="w-12 md:w-20" />
              <span className="text-xl md:text-3xl font-bold">{errors}</span>
            </div>
          )}

          {coins > 0 && (
            <div className="px-2 md:px-4 py-2 flex items-center gap-2">
              <img src={`${import.meta.env.BASE_URL}assets/1768855134283-new.png`} alt="coin" className="w-12 h-12 md:w-20 md:h-20" />
              <span className="text-xl md:text-3xl font-bold">{coins}</span>
            </div>
          )}

          {diamonds > 0 && (
            <div className="px-2 md:px-4 py-2 flex items-center gap-2">
              <img src={`${import.meta.env.BASE_URL}assets/image7-new.png`} alt="diamond" className="w-14 h-14 md:w-22 md:h-22" />
              <span className="text-xl md:text-3xl font-bold">{diamonds}</span>
            </div>
          )}
        </div>
      )}

      {/* Screen Renderers */}
      <div style={{ display: screen === SCREENS.START ? "flex" : "none", width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <StartScreen onStart={() => actions.startLevel(1)} />
      </div>

      <div style={{ display: screen === SCREENS.LEVEL_SPLASH ? "flex" : "none", width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <LevelSplashScreen level={currentLevel} />
      </div>

      {screen === SCREENS.QUIZ && sessionQuestions[questionIndex] && (
        <div className="w-full h-full flex justify-center">
          <QuizScreen
            question={sessionQuestions[questionIndex]}
            shuffledOptions={shuffledOptions}
            shuffledAnswerIndex={shuffledAnswerIndex}
            selectedOption={selectedOption}
            isAnswered={isAnswered}
            isMuted={isMuted}
            toggleMute={actions.toggleMute}
            handleOptionSelect={actions.selectOption}
            checkAnswer={actions.checkAnswer}
            nextQuestion={actions.nextQuestion}
          />
        </div>
      )}

      <div style={{ display: (screen === SCREENS.REWARD || screen === SCREENS.WIN) ? "flex" : "none", width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <RewardScreen rewardType={rewardType} onRestart={() => actions.setScreen(SCREENS.START)} />
      </div>

      <div style={{ display: screen === SCREENS.GAME_OVER ? "flex" : "none", width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <GameOverScreen onRestart={() => actions.setScreen(SCREENS.START)} />
      </div>

      {/* Force Preload Images (Fallback) */}
      <div className="hidden">
        {UI_ASSETS.map(src => <img key={src} src={`${import.meta.env.BASE_URL}assets/${src}`} alt="preload" />)}
      </div>
    </div>
  );
}

export default Game;
