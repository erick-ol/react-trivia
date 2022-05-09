import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'ranking',
  initialState: {
    players: JSON.parse(window.localStorage.getItem('ranking')) || null,
  },
  reducers: {
    addPlayerToRanking(state, { payload }) {
      if (!state.players) {
        state.players = [payload];
        localStorage.setItem('ranking', JSON.stringify(state.players));
      } else {
        state.players.push(payload);
        localStorage.setItem('ranking', JSON.stringify(state.players));
      }
    },
  },
});

export const { addPlayerToRanking } = slice.actions;
export default slice.reducer;
