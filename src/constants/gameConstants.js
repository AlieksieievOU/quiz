export const SCREENS = {
  START: 'start',
  LEVEL_SPLASH: 'level_splash',
  QUIZ: 'quiz',
  REWARD: 'reward',
  GAME_OVER: 'game_over',
  WIN: 'win'
};

export const REWARD_TYPES = {
  COIN: 'coin',
  DIAMOND: 'diamond',
  TROPHY: 'trophy'
};

export const GAME_CONFIG = {
  QUESTIONS_PER_SESSION: 120,
  DIAMONDS_FOR_LEVEL_2: 3,
  DIAMONDS_FOR_LEVEL_3: 4,
  DIAMONDS_FOR_WIN: 4, 
  COINS_PER_DIAMOND: 24,
  LEVEL_SPLASH_DURATION: 1500,
  REWARD_DURATION: 1500,
};

export const INITIAL_STATE = {
  screen: SCREENS.START,
  questionIndex: 0,
  coins: 0,
  diamonds: 0,
  selectedOption: null,
  isAnswered: false,
  isCorrect: false,
  rewardType: null,
  totalQuestionsAnswered: 0,
  shuffledOptions: [],
  shuffledAnswerIndex: null,
  isMuted: false,
  errors: 0,
  sessionQuestions: [],
  currentLevel: 1,
  completedQuestions: [], // IDs of correctly answered questions
  userMatches: [], // For drag-match questions: [{source: id, target: id}]
  draggedItem: null, // Currently dragged item ID
};
