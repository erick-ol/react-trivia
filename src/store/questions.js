import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'questions',
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    fetchStarted(state) {
      state.loading = true;
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchError(state, action) {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;

const { fetchStarted, fetchSuccess, fetchError } = slice.actions;

export const fetchQuestions = () => async (dispatch) => {
  try {
    dispatch(fetchStarted());

    // fetch token
    const Api = await fetch(
      'https://opentdb.com/api_token.php?command=request',
    );
    const { token } = await Api.json();

    // fetch questions
    const response = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token}&encode=base64`,
    );
    const { results } = await response.json();

    dispatch(fetchSuccess(results));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};
