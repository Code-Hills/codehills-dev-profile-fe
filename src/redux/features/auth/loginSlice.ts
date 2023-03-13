import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

interface LoginState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface AuthError {
  message: string;
  code?: string;
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
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = null;
      state.token = action.payload;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.token = null;
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
} = loginSlice.actions;

export const loginUser =
  <T>(token: string) =>
  async (dispatch: any) => {
    dispatch(loginStart());
    try {
      localStorage.setItem('pulseToken', token);
      dispatch(loginSuccess(token));
    } catch (error: any) {
      dispatch(loginFailure(error.message));
    }
  };

export const logoutFromMicrosoft = createAsyncThunk(
  'auth/logoutFromMicrosoft',
  async () => {
    try {
      await axios.get(
        `${
          import.meta.env.VITE_PUBLIC_DEFAULT_API
        }/api/v1/auth/logout`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(
              'pulseToken',
            )}`,
          },
        },
      );
      // call the backend API to logout the user from the Google session
      // const response = await axios.post("/auth/logout/gmail");
      // return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
);

export const logoutUser = () => async (dispatch: any) => {
  try {
    localStorage.setItem('pulseToken', ' ');
    dispatch(logoutSuccess());
  } catch (error: any) {
    dispatch(loginFailure(error.message));
  }
};

// export const { setUser, setError, logout, setLoading } = loginSlice.actions;
export default loginSlice.reducer;
