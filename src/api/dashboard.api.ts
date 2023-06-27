import { createAsyncThunk } from '@reduxjs/toolkit';

import API from '@/api/api';
import { IDashboard } from '@/interfaces/dashboard.interface';

export const getDashboard = createAsyncThunk(
  'dashboard/fetch',
  async () => {
    try {
      const { data } = await API.get('/dashboard');
      const dashboard: IDashboard = data.data;
      return dashboard;
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      throw new Error(message);
    }
  },
);
