/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import API from '@/api/api';
import isAuth from '@/helpers/isAuth';
import Secure from '@/utils/secureLs';

// deactivateUserAcount

// import axios from 'axios';

// export const deactivateUserAcount = (data1) => {
//   return axios
//     .post('http://localhost:2023/api/v1/users/deactivate', data1, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     })
//     .then((response) => response.data)
//     .catch((error) => {
//       throw error;
//     });
// };



export const deactivateUserAcount = createAsyncThunk(
  'disable/user',
  async (data) => {
    const body={
      email:data,
    }
    const { data: deactivateUser } = await API.patch('/users/deactivate',body, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${Secure.getToken}`,
      },
    });
    return deactivateUser;
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

const activateUserAcountSlice = createSlice({
  name: 'diactivate',
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

export const { deactivateuserSuccess } = activateUserAcountSlice.actions;

export default activateUserAcountSlice.reducer;
