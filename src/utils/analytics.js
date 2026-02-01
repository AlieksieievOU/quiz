import ReactGA from 'react-ga4';

// Initialize Google Analytics
// Replace 'G-XXXXXXXXXX' with your actual GA4 Measurement ID
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

let isInitialized = false;
let quizStartTime = null;

export const initGA = () => {
  if (!isInitialized && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    const isHttps = window.location.protocol === 'https:';
    
    ReactGA.initialize(GA_MEASUREMENT_ID, {
      gaOptions: {
        anonymizeIp: true,
      },
      gtagOptions: {
        // 'none' forces the cookie to be set on the specific subdomain (e.g. alieksieievou.github.io)
        // rather than attempting to set it on the parent (.github.io), which is blocked.
        cookie_domain: 'none',
        cookie_flags: isHttps ? 'SameSite=None;Secure' : '',
      }
    });
    isInitialized = true;
    console.log('Google Analytics initialized with robust cookie settings');
  }
};

// Track page views
export const trackPageView = (path) => {
  if (isInitialized) {
    ReactGA.send({ hitType: 'pageview', page: path });
  }
};

// Track quiz start
export const trackQuizStart = (level) => {
  quizStartTime = Date.now();
  
  if (isInitialized) {
    ReactGA.event({
      category: 'Quiz',
      action: 'quiz_start',
      label: `Level ${level}`,
      value: level,
    });
  }
};

// Track quiz completion (win or game over)
export const trackQuizComplete = (outcome, stats) => {
  const duration = quizStartTime ? Math.floor((Date.now() - quizStartTime) / 1000) : 0;
  
  if (isInitialized) {
    ReactGA.event({
      category: 'Quiz',
      action: 'quiz_complete',
      label: outcome, // 'win' or 'game_over'
      value: duration, // Time in seconds
    });

    // Send additional metrics
    ReactGA.event({
      category: 'Quiz',
      action: 'quiz_stats',
      label: `Coins: ${stats.coins}, Diamonds: ${stats.diamonds}, Errors: ${stats.errors}`,
      value: stats.errors,
    });

    // Track time spent on quiz
    ReactGA.event({
      category: 'Quiz',
      action: 'quiz_duration',
      label: `${Math.floor(duration / 60)} minutes`,
      value: duration,
    });
  }

  quizStartTime = null;
};

// Track incorrect answers (error questions)
export const trackIncorrectAnswer = (questionId, questionText, selectedAnswer, correctAnswer, level) => {
  if (isInitialized) {
    ReactGA.event({
      category: 'Quiz',
      action: 'incorrect_answer',
      label: questionText.substring(0, 100), // Truncate to avoid overly long labels
      value: questionId,
    });

    // More detailed tracking for analysis
    ReactGA.event({
      category: 'Error Analysis',
      action: `Level ${level} - Question ${questionId}`,
      label: `Selected: "${selectedAnswer}" | Correct: "${correctAnswer}"`,
    });
  }
};

// Track correct answers
export const trackCorrectAnswer = (questionId, questionText) => {
  if (isInitialized) {
    trackCustomEvent('Quiz', 'correct_answer', questionText.substring(0, 100), questionId);
  }
};

// Track level progression
export const trackLevelProgress = (level) => {
  if (isInitialized) {
    ReactGA.event({
      category: 'Quiz',
      action: 'level_progress',
      label: `Reached Level ${level}`,
      value: level,
    });
  }
};

// Track rewards earned
export const trackReward = (rewardType, totalCoins, totalDiamonds) => {
  if (isInitialized) {
    ReactGA.event({
      category: 'Quiz',
      action: 'reward_earned',
      label: rewardType, // 'coin', 'diamond', or 'trophy'
      value: rewardType === 'diamond' ? totalDiamonds : totalCoins,
    });
  }
};

// Track user engagement time on specific screens
export const trackScreenTime = (screenName, timeInSeconds) => {
  if (isInitialized) {
    ReactGA.event({
      category: 'Engagement',
      action: 'screen_time',
      label: screenName,
      value: timeInSeconds,
    });
  }
};

// Custom event tracker for flexibility
export const trackCustomEvent = (category, action, label, value) => {
  if (isInitialized) {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
  }
};
