import { useReducer, useMemo } from 'react';
import { SCREENS, INITIAL_STATE, GAME_CONFIG, REWARD_TYPES } from '../constants/gameConstants';
import { shuffleArray, prepareQuestion } from '../utils/gameUtils';

import questions1 from '../data/level-1/questions.json';
import questions2 from '../data/level-1/questions2.json';
import questions3 from '../data/level-2/questions.json';
import questions4 from '../data/level-3/questions.json';

const QUESTIONS_BY_LEVEL = {
  1: [...questions1, ...questions2],
  2: [...questions3],
  3: [...questions4]
};

function reducer(state, action) {
  switch (action.type) {
    case 'START_LEVEL': {
      const level = action.payload?.level || 1;
      const questionsForLevel = QUESTIONS_BY_LEVEL[level] || QUESTIONS_BY_LEVEL[1];
      const sessionQuestions = shuffleArray(questionsForLevel).slice(0, GAME_CONFIG.QUESTIONS_PER_SESSION);

      const { options, answerIndex } = prepareQuestion(sessionQuestions[0]);
      
      return {
        ...INITIAL_STATE,
        screen: SCREENS.LEVEL_SPLASH,
        sessionQuestions,
        currentLevel: level,
        shuffledOptions: options,
        shuffledAnswerIndex: answerIndex,
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
        const nextCoins = state.coins + 1;
        if (nextCoins % GAME_CONFIG.COINS_PER_DIAMOND === 0 && nextCoins !== 0) {
          rewardType = REWARD_TYPES.DIAMOND;
        } else {
          rewardType = REWARD_TYPES.COIN;
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

        if (rewardType === REWARD_TYPES.COIN) {
          coins += 1;
        } else if (rewardType === REWARD_TYPES.DIAMOND) {
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

      // Check for Win condition (Trophy)
      if (state.diamonds >= GAME_CONFIG.DIAMONDS_FOR_WIN) {
        return {
          ...state,
          rewardType: REWARD_TYPES.TROPHY,
          screen: SCREENS.REWARD,
        };
      }

      // Check for level transitions
      if (state.currentLevel === 1 && state.diamonds >= GAME_CONFIG.DIAMONDS_FOR_LEVEL_2) {
        return transitionToLevel(state, 2);
      }

      if (state.currentLevel === 2 && state.diamonds >= GAME_CONFIG.DIAMONDS_FOR_LEVEL_3) {
        return transitionToLevel(state, 3);
      }

      const answeredCount = state.totalQuestionsAnswered + 1;

      // Check for Game Over condition
      if (answeredCount >= GAME_CONFIG.QUESTIONS_PER_SESSION) {
        return {
          ...state,
          totalQuestionsAnswered: answeredCount,
          screen: SCREENS.GAME_OVER,
        };
      }

      // Proceed to next question
      const nextIndex = state.questionIndex + 1;
      const currentQuestion = state.sessionQuestions[nextIndex];
      
      if (!currentQuestion) {
        return {
          ...state,
          totalQuestionsAnswered: answeredCount,
          screen: SCREENS.GAME_OVER,
        };
      }

      const { options, answerIndex } = prepareQuestion(currentQuestion);

      return {
        ...state,
        questionIndex: nextIndex,
        shuffledOptions: options,
        shuffledAnswerIndex: answerIndex,
        totalQuestionsAnswered: answeredCount,
        selectedOption: null,
        isAnswered: false,
        isCorrect: false,
        rewardType: null,
        screen: SCREENS.QUIZ,
      };
    }

    case 'TOGGLE_MUTE':
      return { ...state, isMuted: !state.isMuted };

    default:
      return state;
  }
}

function transitionToLevel(state, nextLevel) {
  const questionsForLevel = QUESTIONS_BY_LEVEL[nextLevel];
  const sessionQuestions = shuffleArray(questionsForLevel).slice(0, GAME_CONFIG.QUESTIONS_PER_SESSION);
  const { options, answerIndex } = prepareQuestion(sessionQuestions[0]);

  return {
    ...state,
    screen: SCREENS.LEVEL_SPLASH,
    currentLevel: nextLevel,
    questionIndex: 0,
    sessionQuestions,
    shuffledOptions: options,
    shuffledAnswerIndex: answerIndex,
    totalQuestionsAnswered: 0,
    selectedOption: null,
    isAnswered: false,
    isCorrect: false,
    rewardType: null,
  };
}

export function useGameState() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const actions = useMemo(() => ({
    startLevel: (level) => dispatch({ type: 'START_LEVEL', payload: { level } }),
    setScreen: (screen) => dispatch({ type: 'SET_SCREEN', payload: screen }),
    selectOption: (index) => dispatch({ type: 'SELECT_OPTION', payload: index }),
    checkAnswer: () => dispatch({ type: 'CHECK_ANSWER' }),
    nextQuestion: (fromReward) => dispatch({ type: 'NEXT_QUESTION', payload: { fromReward } }),
    toggleMute: () => dispatch({ type: 'TOGGLE_MUTE' }),
  }), [dispatch]);

  return [state, actions];
}
