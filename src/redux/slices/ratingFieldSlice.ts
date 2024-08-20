import { createSlice } from '@reduxjs/toolkit';

import { IStateWithRatingFields } from '@/interfaces/state.interface';
import {
  getAllRatingFields,
  createFields,
  updateFields,
  deleteFields,
} from '@/api/ratingFields.api';

const initialState: IStateWithRatingFields = {
  ratingFields: [],
  loading: false,
  error: null,
};

const ratingFieldSlice = createSlice({
  name: 'ratingsFields',
  initialState,
  reducers: {
    ratingFieldsSuccess(state) {
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllRatingFields.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRatingFields.fulfilled, (state, action) => {
        state.loading = false;
        state.ratingFields = action.payload;
      })
      .addCase(getAllRatingFields.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(createFields.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFields.fulfilled, (state, action) => {
        state.loading = false;
        state.ratingFields = [...state.ratingFields, action.payload];
      })
      .addCase(createFields.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(updateFields.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFields.fulfilled, (state, action) => {
        state.loading = false;
        state.ratingFields = state.ratingFields.map(ratingFieldName =>
          ratingFieldName.id === action.payload.id
            ? action.payload
            : ratingFieldName,
        );
      })
      .addCase(updateFields.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(deleteFields.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFields.fulfilled, (state, action) => {
        state.loading = false;
        state.ratingFields = state.ratingFields.filter(
          (rating: any) => rating.id !== action.payload,
        );
      });
  },
});

export const { ratingFieldsSuccess } = ratingFieldSlice.actions;
export default ratingFieldSlice.reducer;
