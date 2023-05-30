/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import API from '@/api/api';
import { User } from '@/interfaces/user.interface';

export const deactivateUserAccount = createAsyncThunk(
  'disable/user',
  async (email: string) => {
    const body={
      email,
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
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  user: null,
  isLoading: false,
  error: null,
};

const deactivateUserAccountSlice = createSlice({
  name: 'deactivate',
  initialState,
  reducers: {
    deactivateuserSuccess(state) {
      state.isLoading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(deactivateUserAccount.pending, state => {
        state.isLoading = true;
      })
      .addCase(deactivateUserAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.users;
      })
      .addCase(deactivateUserAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  },
});

export const { deactivateuserSuccess } = deactivateUserAccountSlice.actions;

export default deactivateUserAccountSlice.reducer;
