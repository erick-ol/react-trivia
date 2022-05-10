import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'trivia',
  initialState: {
    seconds: 30,
    id: 0,
    answered: false,
  },

  reducers: {
    setAnswered(state) {
      state.answered = !state.answered;
    },
    decreaseSeconds(state) {
      state.seconds -= 1;
    },
    resetSeconds(state) {
      state.seconds = 30;
    },
    resetTrivia(state) {
      state.seconds = 30;
      state.id = 0;
      state.answered = false;
    },
    increaseId(state) {
      state.id += 1;
    },
  },
});

export const {
  setAnswered,
  decreaseSeconds,
  resetSeconds,
  resetTrivia,
  increaseId,
} = slice.actions;
export default slice.reducer;
