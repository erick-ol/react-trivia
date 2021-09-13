export const SAVE_EMAIL = 'SAVE_EMAIL';
export const CORRECT_QUESTIONS = 'CORRECT_QUESTIONS';

export const saveEmail = (email) => ({ type: SAVE_EMAIL, email });
export const correctAnswer = (correct) => ({ type: CORRECT_QUESTIONS, correct });
