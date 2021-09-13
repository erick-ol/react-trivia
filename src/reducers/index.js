import { combineReducers } from 'redux';
import trivia from './trivia';
import user from './user';

const rootReducer = combineReducers({ user, trivia });

export default rootReducer;
