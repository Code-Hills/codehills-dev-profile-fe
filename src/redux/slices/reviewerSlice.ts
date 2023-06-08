import { createSlice } from '@reduxjs/toolkit';

import { IStateWithReviewers } from '@/interfaces/review.interface';
import {
  getDeveloperReviewers,
  addReviewer,
} from '@/api/reviewer.api';

const initialState: IStateWithReviewers = {
  reviewers: [],
  loading: false,
  error: null,
};

const reviewerSlice = createSlice({
  name: 'reviewers',
  initialState,
  reducers: {
    getReviewersSuccess(state) {
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getDeveloperReviewers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDeveloperReviewers.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewers = action.payload;
      })
      .addCase(getDeveloperReviewers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(addReviewer.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReviewer.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewers = [...state.reviewers, action.payload];
      })
      .addCase(addReviewer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export const { getReviewersSuccess } = reviewerSlice.actions;

export default reviewerSlice.reducer;
