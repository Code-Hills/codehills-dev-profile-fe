import {
  createAsyncThunk,
  createSlice,
  AsyncThunk,
  SerializedError,
} from '@reduxjs/toolkit';

import API from '@/api/api';

interface FetchNotificationsArg {
  page?: number;
  limit?: number;
  append?: boolean; // Include 'append' as an optional property
}

export const fetchNotifications = createAsyncThunk(
  'fetchNotifications',
  async (
    { page, limit = 5, append }: FetchNotificationsArg,
    { rejectWithValue },
  ) => {
    try {
      const { data } = await API.get(
        `/notification?page=${page || 1}&limit=${limit || 5}`,
      );
      return data.notifications;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  },
);

interface InitialState {
  notifications: any[];
  pagination: {
    totalPages: number;
    currentPage: number;
    totalItems: number;
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  notifications: [],
  pagination: {
    totalPages: 1,
    currentPage: 1,
    totalItems: 0,
  },
  isLoading: false,
  error: null,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotifications(state, action) {
      state.notifications = [action.payload, ...state.notifications];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchNotifications.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      const append = action?.meta?.arg?.append || false;
      state.notifications = append
        ? [...state.notifications, ...action.payload.rows]
        : action.payload.rows;

      state.pagination = {
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        totalItems: action.payload.totalItems,
      };
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(fetchNotifications.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { addNotifications } = notificationsSlice.actions;

export default notificationsSlice.reducer;
