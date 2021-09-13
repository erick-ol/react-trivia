import { CORRECT_QUESTIONS } from '../actions';

const INITIAL_STATE = ({
  correctQuestions: 0,
});

function trivia(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CORRECT_QUESTIONS:
    return { ...state, correctQuestions: action.correct };
  default:
    return state;
  }
}

export default trivia;
