/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import API from '@/api/api';
import isAuth from '@/helpers/isAuth';

export const deactivateUserAcount = createAsyncThunk(
  'disable/user',
  async (data) => {
    const body={
      email:data,
    }
    const { data: deactivateUser } = await API.patch('/users/deactivate',body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return deactivateUser;
  },
);

interface InitialState {
  user: any | null;
  isLoading: boolean;
  error: string | null;
}

const isAuthData = isAuth();

const initialState: InitialState = {
  user: null,
  isLoading: false,
  error: null,
};

const deactivateUserAcountSlice = createSlice({
  name: 'deactivate',
  initialState,
  reducers: {
    deactivateuserSuccess(state) {
      state.isLoading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(deactivateUserAcount.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deactivateUserAcount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.users;
      })
      .addCase(deactivateUserAcount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  },
});

export const { deactivateuserSuccess } = deactivateUserAcountSlice.actions;

export default deactivateUserAcountSlice.reducer;
