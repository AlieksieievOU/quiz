/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * @param {Array} array 
 * @returns {Array} Shuffled array
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Prepares a question by shuffling its options.
 * @param {Object} question 
 * @returns {Object} Object containing shuffled options and the new correct answer index
 */
export const prepareQuestion = (question) => {
  if (!question) return { options: [], answerIndex: null };
  const options = shuffleArray(question.options);
  const answerIndex = options.indexOf(question.options[question.answer]);
  return { options, answerIndex };
};
