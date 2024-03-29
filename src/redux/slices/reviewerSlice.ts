import { createSlice } from '@reduxjs/toolkit';

import { IStateWithReviewers } from '@/interfaces/review.interface';
import {
  getDeveloperReviewers,
  addReviewer,
  approveReviewer,
  rejectReviewer,
  deleteMyReviewer,
} from '@/api/reviewer.api';

const initialState: IStateWithReviewers = {
  reviewers: [],
  loading: false,
  error: null,
  isMadeSelfReview: false,
};

const reviewerSlice = createSlice({
  name: 'reviewers',
  initialState,
  reducers: {
    getReviewersSuccess(state) {
      state.loading = false;
    },
    setMadeSelfReview(state, { payload }: { payload: boolean }) {
      state.isMadeSelfReview = payload;
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
      })
      .addCase(approveReviewer.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveReviewer.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewers = state.reviewers.map(reviewer => {
          if (reviewer.id === action.payload.id) {
            return action.payload;
          }
          return reviewer;
        });
      })
      .addCase(approveReviewer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(rejectReviewer.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectReviewer.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewers = state.reviewers.map(reviewer => {
          if (reviewer.id === action.payload.id) {
            return action.payload;
          }
          return reviewer;
        });
      })
      .addCase(rejectReviewer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(deleteMyReviewer.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMyReviewer.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewers = state.reviewers.filter(
          reviewer => reviewer.id !== action.payload.id,
        );
      })
      .addCase(deleteMyReviewer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export const { getReviewersSuccess, setMadeSelfReview } =
  reviewerSlice.actions;

export default reviewerSlice.reducer;
