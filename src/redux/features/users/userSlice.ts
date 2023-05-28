<<<<<<< HEAD
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import Secure from '@/utils/secureLs';
import Keys from '@/utils/keys';

interface UserState {
  users: [] | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: null,
  loading: false,
=======
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
>>>>>>> e2e2cdd (Fix conflict from src/modules/activities/profile/ProfileActivity.tsx")
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
<<<<<<< HEAD
    fetchingUsers(state, actions) {
      state.loading = false;
      state.users = actions.payload;
      state.error = null;
    },
  },
});

export const { fetchingUsers } = userSlice.actions;
=======
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
>>>>>>> e2e2cdd (Fix conflict from src/modules/activities/profile/ProfileActivity.tsx")

export default userSlice.reducer;
