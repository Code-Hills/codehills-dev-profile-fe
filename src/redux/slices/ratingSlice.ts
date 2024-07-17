import { createSlice } from '@reduxjs/toolkit';

import { IStateWithRatings } from '@/interfaces/state.interface';
import {
  getAllRatings,
  createRating,
  updateRating,
  deleteRating,
} from '@/api/rating.api';

const initialState: IStateWithRatings = {
  name: [],
  loading: false,
  error: null,
};

const ratingSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    ratingNameSuccess(state) {
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllRatings.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRatings.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload;
      })
      .addCase(getAllRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(createRating.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRating.fulfilled, (state, action) => {
        state.loading = false;
        state.name = [...state.name, action.payload];
      })
      .addCase(createRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(updateRating.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRating.fulfilled, (state, action) => {
        state.loading = false;
        state.name = state.name.map(ratingName =>
          ratingName.id === action.payload.id
            ? action.payload
            : ratingName,
        );
      })
      .addCase(updateRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(deleteRating.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRating.fulfilled, (state, action) => {
        state.loading = false;
        state.name = state.name.filter(
          (rating: any) => rating.id !== action.payload,
        );
      });
  },
});

export const { ratingNameSuccess } = ratingSlice.actions;
export default ratingSlice.reducer;
