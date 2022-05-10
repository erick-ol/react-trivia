import { combineReducers, configureStore } from '@reduxjs/toolkit';

// reducers
import player from './player';
import ranking from './ranking';
import questions from './questions';
import trivia from './trivia';

const reducer = combineReducers({ player, ranking, questions, trivia });
const store = configureStore({ reducer });

export default store;
