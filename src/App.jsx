import React, { useEffect, Activity, useReducer } from 'react';
import questions from './data/questions.json';
import './App.css';

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
};

function reducer(state, action) {
  switch (action.type) {
    case 'START_LEVEL': {
      const firstQuestion = questions[0];
      const options = shuffleArray(firstQuestion.options);
      return {
        ...initialState,
        screen: SCREENS.LEVEL_SPLASH,
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
      let { coins, diamonds, rewardType } = state;

      if (correct) {
        coins += 1;
        // Check for Diamond Reward
        if (coins % 3 === 0 && coins !== 0) {
          rewardType = 'diamond';
          diamonds += 1;
        } else {
          rewardType = 'coin';
        }
      }

      return {
        ...state,
        isCorrect: correct,
        isAnswered: true,
        coins,
        diamonds,
        rewardType,
      };
    }

    case 'NEXT_QUESTION': {
      const { fromReward = false } = action.payload || {};
      
      // If we're coming from the quiz and were correct, show the reward splash
      if (!fromReward && state.isCorrect) {
        return { ...state, screen: SCREENS.REWARD };
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
      const nextIndex = (state.questionIndex + 1) % questions.length;
      const options = shuffleArray(questions[nextIndex].options);
      return {
        ...state,
        questionIndex: nextIndex,
        shuffledOptions: options,
        shuffledAnswerIndex: options.indexOf(questions[nextIndex].options[questions[nextIndex].answer]),
        totalQuestionsAnswered: answeredCount,
        selectedOption: null,
        isAnswered: false,
        isCorrect: false,
        screen: SCREENS.QUIZ,
      };
    }

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { 
    screen, questionIndex, coins, diamonds, 
    selectedOption, isAnswered, rewardType,
    shuffledOptions, shuffledAnswerIndex
  } = state;

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

  return (
    <div 
      className={`game-container ${screen !== SCREENS.START ? 'bg-linear-to-b from-[#FFF9E1] to-[#F3E2A9]' : ''}`} 
      style={screen === SCREENS.START ? { backgroundImage: "url('/assets/image10.png')" } : {}}
    >
      
      <Activity mode={screen === SCREENS.START ? "visible" : "hidden"}>
        <StartScreen onStart={() => dispatch({ type: 'START_LEVEL' })} />
      </Activity>

      <Activity mode={screen === SCREENS.LEVEL_SPLASH ? "visible" : "hidden"}>
        <LevelSplashScreen />
      </Activity>

      <Activity mode={screen === SCREENS.QUIZ ? "visible" : "hidden"}>
        <QuizScreen 
          question={questions[questionIndex]}
          shuffledOptions={shuffledOptions}
          shuffledAnswerIndex={shuffledAnswerIndex}
          coins={coins}
          diamonds={diamonds}
          selectedOption={selectedOption}
          isAnswered={isAnswered}
          handleOptionSelect={(idx) => dispatch({ type: 'SELECT_OPTION', payload: idx })}
          checkAnswer={() => dispatch({ type: 'CHECK_ANSWER' })}
          nextQuestion={() => dispatch({ type: 'NEXT_QUESTION' })}
        />
      </Activity>

      <Activity mode={(screen === SCREENS.REWARD || screen === SCREENS.WIN) ? "visible" : "hidden"}>
        <RewardScreen rewardType={rewardType} />
      </Activity>

      <Activity mode={screen === SCREENS.GAME_OVER ? "visible" : "hidden"}>
        <GameOverScreen onRestart={() => dispatch({ type: 'SET_SCREEN', payload: SCREENS.START })} />
      </Activity>
    </div>
  );
}

export default App;
