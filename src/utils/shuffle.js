/**
 * Fisher-Yates array shuffle algorithm
 * @param {Array} arr - The array to shuffle
 * @returns {Array} A new shuffled array
 */
export function shuffleArray(arr) {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

/**
 * Shuffles the options of a question and updates the correctIndex
 * to point to the correct option in the new shuffled array.
 * @param {Object} question - The question object { id, q, o: [], a: number }
 * @returns {Object} A new question object with shuffled options
 */
export function shuffleOptions(question) {
  // Map options to include their original index
  const optionsWithIndex = question.o.map((optText, index) => ({
    text: optText,
    isCorrect: index === question.a
  }));

  // Shuffle the objects
  const shuffledOptions = shuffleArray(optionsWithIndex);

  // Find the new index of the correct answer
  const newCorrectIndex = shuffledOptions.findIndex(opt => opt.isCorrect);

  return {
    ...question,
    o: shuffledOptions.map(opt => opt.text),
    originalCorrectIndex: question.a,
    a: newCorrectIndex
  };
}
