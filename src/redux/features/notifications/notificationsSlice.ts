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
interface User {
  id: string;
  email: string;
  displayName: string;
  role: string;
  createdAt: string;
}

interface Notification {
  id: string;
  title: string;
  description: string;
  url: string;
  userId: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
}

interface Pagination {
  totalPages: number;
  currentPage: string;
  totalItems: number;
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
  notifications: {
    rows: Notification[];
    pagination: Pagination;
  };
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  notifications: {
    rows: [],
    pagination: {
      totalPages: 1,
      currentPage: '1',
      totalItems: 0,
    },
  },
  unreadCount: 0,
  isLoading: false,
  error: null,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotifications(state, action) {
      state.notifications.rows = [
        action.payload,
        ...state.notifications.rows,
      ];
      state.unreadCount = state.notifications.rows.filter(
        n => !n.read,
      ).length;
    },
    markAsRead(state, action) {
      const notification = state.notifications.rows.find(
        n => n.id === action.payload,
      );
      if (notification) {
        notification.read = true;
      }
      state.unreadCount = state.notifications.rows.filter(
        n => !n.read,
      ).length;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      const append = action?.meta?.arg?.append || false;
      state.notifications.rows = append
        ? [...state.notifications.rows, ...action.payload.rows]
        : action.payload.rows;

      state.notifications.pagination = {
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        totalItems: action.payload.totalItems,
      };
      state.unreadCount = state.notifications.rows.filter(
        n => !n.read,
      ).length;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(fetchNotifications.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { addNotifications, markAsRead } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
