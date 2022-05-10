import { combineReducers, configureStore } from '@reduxjs/toolkit';

// reducers
import player from './player';
import ranking from './ranking';
import questions from './questions';

const reducer = combineReducers({ player, ranking, questions });
const store = configureStore({ reducer });

export default store;
