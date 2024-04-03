import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import API from '@/api/api';
import isAuth from '@/helpers/isAuth';
import { IProject } from '@/interfaces/project.interface';

export const getMyProfile = createAsyncThunk(
  'profile/fetch',
  async () => {
    const { data } = await API.get('/profile');
    return data;
  },
);

export const updateProfile = createAsyncThunk(
  'profile/update',
  async (data: Record<string, any>) => {
    const { data: updatedData } = await API.put('/profile', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return updatedData;
  },
);

export const getMyProjects = createAsyncThunk(
  'profile/projects',
  async (userId: string) => {
    const { data } = await API.get(`/users/${userId}/projects`);
    return data;
  },
);

interface InitialState {
  tokenData: Record<string, any> | null;
  user: Record<string, any> | null;
  isLoading: boolean;
  error: string | null;

  // updates
  isUpdating: boolean;
  updateError: string | null;

  // projects
  projects: IProject[];
}

const isAuthData = isAuth();

const initialState: InitialState = {
  tokenData: isAuthData || null,
  user: null,
  isLoading: false,
  error: null,

  // update
  isUpdating: false,
  updateError: null,

  // projects
  projects: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    removeProfileSuccess(state) {
      state.isLoading = false;
      state.tokenData = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMyProfile.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(getMyProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(updateProfile.pending, state => {
        state.isUpdating = true;
        state.updateError = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.user = action.payload.data;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateError = action.error.message as string;
      })
      .addCase(getMyProjects.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMyProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload.projects;
      })
      .addCase(getMyProjects.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { removeProfileSuccess } = profileSlice.actions;

export default profileSlice.reducer;
