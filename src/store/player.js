import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'player',
  initialState: {
    name: '',
    assertions: 0,
    score: 0,
    email: '',
  },
  reducers: {
    addPlayerInfo(state, { payload }) {
      state.name = payload.name;
      state.email = payload.email;
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
