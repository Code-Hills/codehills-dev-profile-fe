/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import API from '@/api/api';
import { User } from '@/interfaces/user.interface';
import { IProject } from '@/interfaces/project.interface';

export const getAllUsers = createAsyncThunk(
  'users/fetch',
  async () => {
    try{
      const { data } = await API.get('/users');
      return data;
    }catch(error: any){
      throw error?.response?.data;
    }
  },
);



export const getAllProjects = createAsyncThunk(
  'All/projects',
  async () => {
    // eslint-disable-next-line no-useless-catch
    try{
      const { data } = await API.get('/projects');
      return data;
    }catch(error: any){
      throw error?.response?.data;
    }
   
  },
);

export const getAllUserByProjects = createAsyncThunk(
  'AllUsers/projects',
  async (projectId: number) => {
    // eslint-disable-next-line no-useless-catch
    try{
      const { data } = await API.get(`/projects/${projectId}/users`);
      return data;
    }catch(error: any){
      throw error?.response?.data;
    }
   
  },
);

interface InitialState {
  users: User[];
  usersByProject: User[];
  projects: IProject[],
  isLoading: boolean;
  isLoadingUserByProjects: boolean,
  isLoadingProjects:boolean;
  error: string | null;
}

const initialState: InitialState = {
  users: [],
  usersByProject:[],
  projects:[],
  isLoadingProjects:false,
  isLoading: false,
  error: null,
  isLoadingUserByProjects:false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
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
        state.users = action.payload.users;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(getAllProjects.pending, state => {
        state.isLoadingProjects = true;
        state.error = null;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.isLoadingProjects = false;
        state.projects = action.payload.projects;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.isLoadingProjects = false;
        state.error = action.error.message as string;
      })
      .addCase(getAllUserByProjects.pending, state => {
        state.isLoadingUserByProjects = true;
        state.error = null;
      })
      .addCase(getAllUserByProjects.fulfilled, (state, action) => {
        state.isLoadingUserByProjects = false;
        state.usersByProject = action.payload;
      })
      .addCase(getAllUserByProjects.rejected, (state, action) => {
        state.isLoadingUserByProjects = false;
        state.error = action.error.message as string;
      });
    },
});

export const { getuserSuccess } = userSlice.actions;

export default userSlice.reducer;