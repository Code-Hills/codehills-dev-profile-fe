import { createSlice } from '@reduxjs/toolkit';

import { IStateWithSearch } from '@/interfaces/search.interface';
import { searchUsers } from '@/api/search.api';

const initialState: IStateWithSearch = {
  loading: false,
  error: null,
  searchUserResults: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchUsersSuccess(state) {
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(searchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.searchUserResults = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export const { searchUsersSuccess } = searchSlice.actions;

export default searchSlice.reducer;
