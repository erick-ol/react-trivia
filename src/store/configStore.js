import { combineReducers, configureStore } from '@reduxjs/toolkit';

// reducers
import player from './player';

const reducer = combineReducers({ player });
const store = configureStore({ reducer });

export default store;
