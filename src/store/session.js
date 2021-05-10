/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    value: false,
  },
  reducers: {
    setValidSession: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setValidSession } = sessionSlice.actions;

export default sessionSlice.reducer;
