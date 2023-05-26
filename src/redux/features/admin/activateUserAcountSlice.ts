/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import API from '@/api/api';
import isAuth from '@/helpers/isAuth';

export const activateUserAcount = createAsyncThunk(
  'activate/user',
  async (data: string) => {
    const body={
      email:data,
    }
    const { data: activateUser } = await API.patch('/users/activate',body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return activateUser;
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

const activateUserAcountSlice = createSlice({
  name: 'deactivate',
  initialState,
  reducers: {
    deactivateuserSuccess(state) {
      state.isLoading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(activateUserAcount.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(activateUserAcount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.users;
      })
      .addCase(activateUserAcount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  },
});

export const { deactivateuserSuccess } = activateUserAcountSlice.actions;

export default activateUserAcountSlice.reducer;
