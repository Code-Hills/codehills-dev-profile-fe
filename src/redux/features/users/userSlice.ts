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
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchingUsers(state, actions) {
      state.loading = false;
      state.users = actions.payload;
      state.error = null;
    },
  },
});

export const { fetchingUsers } = userSlice.actions;

export default userSlice.reducer;
