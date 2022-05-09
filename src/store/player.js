import { createSlice } from '@reduxjs/toolkit';
import md5 from 'crypto-js/md5';

const slice = createSlice({
  name: 'player',
  initialState: {
    name: '',
    assertions: 0,
    score: 0,
    email: '',
    image: '',
  },
  reducers: {
    addPlayerInfo(state, { payload }) {
      const { name, email } = payload;
      const hash = md5(email).toString();

      state.image = `https://www.gravatar.com/avatar/${hash}`;
      state.name = name;
      state.email = email;
    },
    addAssertion(state) {
      state.assertions += 1;
    },
    addPoints(state, { payload }) {
      state.score += payload;
    },
    resetPlayer(state) {
      state.name = '';
      state.assertions = 0;
      state.score = 0;
      state.email = '';
    },
  },
});

export const { addPlayerInfo, addAssertion, addPoints, resetPlayer } =
  slice.actions;
export default slice.reducer;
