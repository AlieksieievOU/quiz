import { useReducer, useMemo, useEffect } from 'react';
import { SCREENS, INITIAL_STATE, GAME_CONFIG, REWARD_TYPES } from '../constants/gameConstants';
import { shuffleArray, prepareQuestion } from '../utils/gameUtils';

import questions1 from '../data/level-1/questions.json';
import questions2 from '../data/level-1/questions2.json';
import questions5 from '../data/level-1/questions3.json';
import questions3 from '../data/level-2/questions.json';
import questions4 from '../data/level-3/questions.json';

const QUESTIONS_BY_LEVEL = {
  // 1: [...questions1,...questions2,...questions5],
  1: [...questions5],
  2: [...questions3],
  3: [...questions4]
};

const STORAGE_KEY = 'quiz_game_state_v2';

function reducer(state, action) {
  switch (action.type) {
    case 'START_LEVEL': {
      const level = action.payload?.level || 1;
      const questionsForLevel = QUESTIONS_BY_LEVEL[level] || QUESTIONS_BY_LEVEL[1];
      
      // Filter out questions that have already been answered correctly
      // Unless all questions are completed, then cycle back or reset (here we recycle if fewer than session needs)
      const previouslyCompleted = new Set(state.completedQuestions || []);
      let availableQuestions = questionsForLevel.filter(q => !previouslyCompleted.has(q.id));
      
      // If run out of questions, maybe recycle everything?
      // Or just take what's left. For now, if empty, recycle all to keep game playable.
      if (availableQuestions.length === 0) {
        availableQuestions = [...questionsForLevel];
      }

      const sessionQuestions = shuffleArray(availableQuestions).slice(0, GAME_CONFIG.QUESTIONS_PER_SESSION);

      // Only prepare question if it's a regular question with options
      const firstQuestion = sessionQuestions[0];
      let options = [];
      let answerIndex = null;
      
      if (firstQuestion && firstQuestion.type !== 'drag-match') {
        const prepared = prepareQuestion(firstQuestion);
        options = prepared.options;
        answerIndex = prepared.answerIndex;
      }
      
      return {
        ...INITIAL_STATE,
        // Preserve Volume preference and Completed Questions history
        isMuted: state.isMuted,
        completedQuestions: state.completedQuestions || [],
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
      const currentQ = state.sessionQuestions[state.questionIndex];
      
      // Handle drag-match questions
      if (currentQ?.type === 'drag-match') {
        if (!state.userMatches || state.userMatches.length === 0) return state;
        
        // Check if all matches are correct
        const correctMatches = currentQ.answer;
        const correct = correctMatches.every(correctMatch => 
          state.userMatches.some(userMatch => 
            userMatch.source === correctMatch.source && 
            userMatch.target === correctMatch.target
          )
        ) && state.userMatches.length === correctMatches.length;
        
        let rewardType = null;
        if (correct) {
          const nextCoins = state.coins + 1;
          if (nextCoins % GAME_CONFIG.COINS_PER_DIAMOND === 0 && nextCoins !== 0) {
            rewardType = REWARD_TYPES.DIAMOND;
          } else {
            rewardType = REWARD_TYPES.COIN;
          }
        }
        
        let newCompleted = state.completedQuestions || [];
        if (correct && currentQ && !newCompleted.includes(currentQ.id)) {
          newCompleted = [...newCompleted, currentQ.id];
        }
        
        return {
          ...state,
          isCorrect: correct,
          isAnswered: true,
          rewardType,
          completedQuestions: newCompleted,
          errors: !correct ? state.errors + 1 : state.errors,
        };
      }
      
      // Handle regular multiple-choice questions
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
      
      // Only track as "Completed" if correct and ensure unique
      let newCompleted = state.completedQuestions || [];
      if (correct && currentQ && !newCompleted.includes(currentQ.id)) {
        newCompleted = [...newCompleted, currentQ.id];
      }

      return {
        ...state,
        isCorrect: correct,
        isAnswered: true,
        rewardType,
        completedQuestions: newCompleted, // Persist correct answers
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

      // Only prepare question if it's a regular question with options
      let options = [];
      let answerIndex = null;
      
      if (currentQuestion.type !== 'drag-match') {
        const prepared = prepareQuestion(currentQuestion);
        options = prepared.options;
        answerIndex = prepared.answerIndex;
      }

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
        userMatches: [], // Reset drag-match state
        draggedItem: null, // Reset dragged item
      };
    }

    case 'SET_USER_MATCH': {
      const { source, target } = action.payload;
      // Remove any existing match for this source or target
      const filteredMatches = state.userMatches.filter(
        match => match.source !== source && match.target !== target
      );
      // Add new match
      return {
        ...state,
        userMatches: [...filteredMatches, { source, target }]
      };
    }

    case 'SET_DRAGGED_ITEM':
      return { ...state, draggedItem: action.payload };

    case 'TOGGLE_MUTE':
      return { ...state, isMuted: !state.isMuted };

    default:
      return state;
  }
}

function transitionToLevel(state, nextLevel) {
  const questionsForLevel = QUESTIONS_BY_LEVEL[nextLevel];
  const sessionQuestions = shuffleArray(questionsForLevel).slice(0, GAME_CONFIG.QUESTIONS_PER_SESSION);
  
  // Only prepare question if it's a regular question with options
  const firstQuestion = sessionQuestions[0];
  let options = [];
  let answerIndex = null;
  
  if (firstQuestion && firstQuestion.type !== 'drag-match') {
    const prepared = prepareQuestion(firstQuestion);
    options = prepared.options;
    answerIndex = prepared.answerIndex;
  }

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
    userMatches: [],
    draggedItem: null,
  };
}

// Lazy initializer for state
const getInitialState = () => {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.warn('Failed to load game state from local storage', error);
  }
  return INITIAL_STATE;
};

export function useGameState() {
  // Use getInitialState as useReducer's init function (3rd arg) requires a slightly different signature if init arg is passed
  // Or simpler: pass it as 2nd arg by calling it.
  // Standard Hook pattern: useReducer(reducer, initialArg, init?) 
  // We can just pass the result of getInitialState() as the 2nd arg.
  // Ideally, use a lazy init: useReducer(reducer, null, getInitialState) 
  const [state, dispatch] = useReducer(reducer, null, getInitialState);

  // Persistence Effect
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn('Failed to save game state to local storage', error);
    }
  }, [state]);

  const actions = useMemo(() => ({
    startLevel: (level) => dispatch({ type: 'START_LEVEL', payload: { level } }),
    setScreen: (screen) => dispatch({ type: 'SET_SCREEN', payload: screen }),
    selectOption: (index) => dispatch({ type: 'SELECT_OPTION', payload: index }),
    checkAnswer: () => dispatch({ type: 'CHECK_ANSWER' }),
    nextQuestion: (fromReward) => dispatch({ type: 'NEXT_QUESTION', payload: { fromReward } }),
    toggleMute: () => dispatch({ type: 'TOGGLE_MUTE' }),
    setUserMatch: (source, target) => dispatch({ type: 'SET_USER_MATCH', payload: { source, target } }),
    setDraggedItem: (itemId) => dispatch({ type: 'SET_DRAGGED_ITEM', payload: itemId }),
  }), [dispatch]);

  return [state, actions];
}
