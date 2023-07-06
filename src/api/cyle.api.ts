/* eslint-disable sonarjs/no-duplicate-string */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

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
  async (cycle: Pick<Cycle, 'startDate' | 'endDate'>) => {
    try {
      const { data } = await API.post('/reviewCycles', cycle);
      const cycleData: Cycle = data.data;
      toast.success(data.message || 'Cycle created successfully');
      return {
        ...cycleData,
        name: getReviewCycleLabel(cycleData),
      };
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || 'Something went wrong');
      throw new Error(message);
    }
  },
);

export const updateCycle = createAsyncThunk(
  'cyles/update',
  async (cycle: Pick<Cycle, 'id' | 'startDate' | 'endDate'>) => {
    const { id, ...rest } = cycle;
    try {
      const { data } = await API.put(`/reviewCycles/${id}`, rest);
      const cycleData: Cycle = data.data;
      toast.success(data.message || 'Cycle updated successfully');
      return {
        ...cycleData,
        name: getReviewCycleLabel(cycleData),
      };
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || 'Something went wrong');
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

export const startCycle = createAsyncThunk(
  'cyles/start',
  async (cycle: Cycle) => {
    try {
      const { data } = await API.put(
        `/reviewCycles/start/${cycle.id}`,
      );
      const cycleData: Cycle = data.data;
      toast.success(data.message || 'Cycle started successfully');
      return {
        ...cycleData,
        name: getReviewCycleLabel(cycleData),
      };
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || 'Something went wrong');
      throw new Error(message);
    }
  },
);

export const endCycle = createAsyncThunk(
  'cyles/end',
  async (cycle: Cycle) => {
    try {
      const { data } = await API.put(`/reviewCycles/end/${cycle.id}`);
      const cycleData: Cycle = data.data;
      toast.success(data.message || 'Cycle ended successfully');
      return {
        ...cycleData,
        name: getReviewCycleLabel(cycleData),
      };
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || 'Something went wrong');
      throw new Error(message);
    }
  },
);
