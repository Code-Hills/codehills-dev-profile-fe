import Secure from '@/utils/secureLs';
import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

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
});

export const {
  logoutSuccess,
} = loginSlice.actions;


export const logoutFromMicrosoft = createAsyncThunk(
  'auth/logoutFromMicrosoft',
  async () => {
    try {
      await axios.post(
        `${
          import.meta.env.VITE_PUBLIC_DEFAULT_API
        }/api/v1/auth/logout`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: Secure.getToken(),
          },
        },
      );
    } catch (error: any) {
      throw error.response.data;
    }
  },
);

export default loginSlice.reducer;
