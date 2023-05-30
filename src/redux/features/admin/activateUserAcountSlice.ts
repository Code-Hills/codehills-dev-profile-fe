/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import API from '@/api/api';
import { User } from '@/interfaces/user.interface';

export const activateUserAccount = createAsyncThunk(
  'activate/user',
  async (email: string) => {
    try {
      const body={
        email,
      }
      const { data: activateUser } = await API.patch('/users/activate',body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return activateUser;
    } catch (error) {
      return toast.error('Failed to activate user account');
    }
    
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

const activateUserAccountSlice = createSlice({
  name: 'deactivate',
  initialState,
  reducers: {
    deactivateuserSuccess(state) {
      state.isLoading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(activateUserAccount.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(activateUserAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.users;
      })
      .addCase(activateUserAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  },
});

export const { deactivateuserSuccess } = activateUserAccountSlice.actions;

export default activateUserAccountSlice.reducer;
