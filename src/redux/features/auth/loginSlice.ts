import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';

import API from '@/api/api';
import Secure from '@/utils/secureLs';

export const logoutFromMicrosoft = createAsyncThunk(
  'auth/logoutFromMicrosoft',
  async (navigate: NavigateFunction) => {
    try {
      const { data } = await API.post(`/auth/logout`);
      toast.success('You have been logged out successfully');
      return data;
    } catch (error: any) {
      throw error?.response?.data;
    } finally {
      navigate('/');
      Secure.removeToken();
    }
  },
);

interface LoginState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  token: null,
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logoutSuccess(state) {
      state.loading = false;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(logoutFromMicrosoft.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutFromMicrosoft.fulfilled, state => {
        state.loading = false;
        state.token = null;
        state.error = null;
      })
      .addCase(logoutFromMicrosoft.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { logoutSuccess } = loginSlice.actions;

export default loginSlice.reducer;
