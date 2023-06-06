import { createAsyncThunk } from '@reduxjs/toolkit';

import API from '@/api/api';
import { Cycle } from '@/interfaces/cycle.interface';
import { getReviewCycleLabel } from '@/helpers/format';

export const getAllCyles = createAsyncThunk(
  'cyles/fetch',
  async () => {
    try {
      const { data } = await API.get('/reviewCycles');
      const cyles: Cycle[] = data.data;
      return cyles.map(item => ({
        ...item,
        name: getReviewCycleLabel(item),
      }));
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      throw new Error(message);
    }
  },
);

export const createCycle = createAsyncThunk(
  'cyles/create',
  async (cycle: Cycle) => {
    try {
      const { data } = await API.post('/reviewCycles', cycle);
      const cycleData: Cycle = data.data;
      return {
        ...cycleData,
        name: getReviewCycleLabel(cycle),
      };
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      throw new Error(message);
    }
  },
);

export const updateCycle = createAsyncThunk(
  'cyles/update',
  async (cycle: Cycle) => {
    const { id, ...rest } = cycle;
    try {
      const { data } = await API.put(`/reviewCycles/${id}`, rest);
      const cycleData: Cycle = data.data;
      return {
        ...cycleData,
        name: getReviewCycleLabel(cycle),
      };
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      throw new Error(message);
    }
  },
);

export const deleteCycle = createAsyncThunk(
  'cyles/delete',
  async (cycle: Cycle) => {
    try {
      await API.delete(`/reviewCycles/${cycle.id}`);
      return cycle.id;
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      throw new Error(message);
    }
  },
);
