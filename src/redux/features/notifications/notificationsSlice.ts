import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import API from '@/api/api';

export const getAllnotifications = createAsyncThunk(
  '/notification',
  async ({ page, limit }: { page: number; limit: number }) => {
    const { data } = await API.get(
      `/notification?page=${page}&limit=${limit}`,
    );
    return data;
  },
);

interface InitialState {
  notifications: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  notifications: [],
  isLoading: false,
  error: null,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    getnotificationSuccess(state) {
      state.isLoading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllnotifications.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllnotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload.notifications;
      })
      .addCase(getAllnotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  },
});

export const { getnotificationSuccess } = notificationsSlice.actions;

export default notificationsSlice.reducer;
