export const answeredStyle = (className, styles, answered) => {
  if (className === 'correct') {
    return answered ? styles.correct : '';
  }
  return answered ? styles.incorrect : '';
};
