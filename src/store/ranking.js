import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'ranking',
  initialState: {
    players: JSON.parse(window.localStorage.getItem('ranking')) || null,
  },
  reducers: {
    addPlayerToRanking(state, payload) {
      if (!state.players) {
        localStorage.setItem('ranking', JSON.stringify([payload]));

        state.players = [payload];
      } else {
        const players = JSON.parse(localStorage.getItem('ranking'));
        players.push(payload);
        localStorage.setItem('ranking', JSON.stringify(players));

        state.players.push(payload);
      }
    },
  },
});

export const { addPlayerToRanking } = slice.actions;
export default slice.reducer;
