export const progressBar = (id, styles) => {
  switch (id) {
    case 0:
      return styles.question_0;
    case 1:
      return styles.question_1;
    case 2:
      return styles.question_2;
    case 3:
      return styles.question_3;
    case 4:
      return styles.question_4;
    default:
      return 0;
  }
};
