import { createSlice } from '@reduxjs/toolkit';

import { IStateWithCycles } from '@/interfaces/state.interface';
import { getAllCyles } from '@/api/cyle.api';

const initialState: IStateWithCycles = {
  cycles: [],
  activeCycle: null,
  loading: false,
  error: null,
};

const cycleSlice = createSlice({
  name: 'cycles',
  initialState,
  reducers: {
    getCyclesSuccess(state) {
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllCyles.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCyles.fulfilled, (state, action) => {
        state.loading = false;
        state.cycles = action.payload;
        state.activeCycle =
          state.cycles.find(cycle => cycle.active) || null;
      })
      .addCase(getAllCyles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export const { getCyclesSuccess } = cycleSlice.actions;

export default cycleSlice.reducer;
