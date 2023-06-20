import { createSlice } from '@reduxjs/toolkit';

import { IStateWithDashboard } from '@/interfaces/dashboard.interface';
import { getDashboard } from '@/api/dashboard.api';

const initialState: IStateWithDashboard = {
  loading: false,
  error: null,
  dashboard: {
    recentProjects: [],
    totalDevelopers: 0,
    totalProjects: 0,
    totalReceivedReviews: 0,
    totalReviews: 0,
    totalReviewCycle: 0,
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    getDashboardSuccess(state) {
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getDashboard.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(getDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export const { getDashboardSuccess } = dashboardSlice.actions;

export default dashboardSlice.reducer;
