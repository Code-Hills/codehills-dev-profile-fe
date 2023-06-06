import { createSlice } from '@reduxjs/toolkit';

import { IStateWithReviews } from '@/interfaces/review.interface';
import { getAllReviews, createReview } from '@/api/review.api';

const initialState: IStateWithReviews = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    getReviewsSuccess(state) {
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllReviews.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(createReview.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = [...state.reviews, action.payload];
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export const { getReviewsSuccess } = reviewSlice.actions;

export default reviewSlice.reducer;
