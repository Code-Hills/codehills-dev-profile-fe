import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import API from '@/api/api';

interface MarkOneNotificationState {
  data: Record<string, unknown>;
  isLoading: boolean;
  error: string | null;
}

const initialState: MarkOneNotificationState = {
  data: {},
  isLoading: false,
  error: null,
};

export const markOneNotification = createAsyncThunk(
  'markOneNotification',
  async (notificationId: string, { rejectWithValue }) => {
    try {
      const { data } = await API.patch(
        `/notification/${notificationId}`,
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  },
);

export const markOneNotificationSlice = createSlice({
  name: 'markOneNotification',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(markOneNotification.pending, state => {
      state.isLoading = true;
      state.data = {};
      state.error = null;
    });

    builder.addCase(
      markOneNotification.fulfilled,
      (state, action: PayloadAction<Record<string, unknown>>) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = null;
      },
    );

    builder.addCase(markOneNotification.rejected, (state, action) => {
      state.data = {};
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export default markOneNotificationSlice.reducer;
