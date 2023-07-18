import { createSlice } from '@reduxjs/toolkit';

import { IStateWithCycles } from '@/interfaces/state.interface';
import {
  getAllCyles,
  createCycle,
  updateCycle,
  startCycle,
  endCycle,
} from '@/api/cyle.api';

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
    calculateActiveCycle(state) {
      const activeCycle = state.cycles.find(cycle => cycle.active);
      state.activeCycle = activeCycle || null;
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
      })
      .addCase(createCycle.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCycle.fulfilled, (state, action) => {
        state.loading = false;
        state.cycles = [...state.cycles, action.payload];
      })
      .addCase(createCycle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(updateCycle.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCycle.fulfilled, (state, action) => {
        state.loading = false;
        state.cycles = state.cycles.map(cycle =>
          cycle.id === action.payload.id ? action.payload : cycle,
        );
      })
      .addCase(updateCycle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(startCycle.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startCycle.fulfilled, (state, action) => {
        state.loading = false;
        state.cycles = state.cycles.map(cycle =>
          cycle.id === action.payload.id ? action.payload : cycle,
        );
      })
      .addCase(startCycle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(endCycle.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(endCycle.fulfilled, (state, action) => {
        state.loading = false;
        state.cycles = state.cycles.map(cycle =>
          cycle.id === action.payload.id ? action.payload : cycle,
        );
      });
  },
});

export const { getCyclesSuccess, calculateActiveCycle } =
  cycleSlice.actions;

export default cycleSlice.reducer;
