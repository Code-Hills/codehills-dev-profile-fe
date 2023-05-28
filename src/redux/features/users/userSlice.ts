/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import API from '@/api/api';
import isAuth from '@/helpers/isAuth';

export const getAllUsers = createAsyncThunk(
  'users/fetch',
  async () => {
    const { data } = await API.get('/users');
    return data;
  },
);

interface InitialState {
  // tokenData: Record<string, any> | null;
  user: any | null;
  isLoading: boolean;
  error: string | null;
}

const isAuthData = isAuth();

const initialState: InitialState = {
  // tokenData: isAuthData || null,
  user: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getuserSuccess(state) {
      state.isLoading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllUsers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.users;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
    },
});

export const { getuserSuccess } = userSlice.actions;

export default userSlice.reducer;
