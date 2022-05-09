import { combineReducers, configureStore } from '@reduxjs/toolkit';

// reducers
import player from './player';
import ranking from './ranking';

const reducer = combineReducers({ player, ranking });
const store = configureStore({ reducer });

export default store;
