/* eslint-disable sonarjs/no-duplicate-string */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import API from '@/api/api';
import { RatingFields } from '@/interfaces/ratingFields.interface';

export const getAllRatingFields = createAsyncThunk(
  'ratingFields/fetch',
  async () => {
    try {
      const { data } = await API.get('/ratingFields');
      const ratings: RatingFields[] = data.data;
      return ratings;
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      throw new Error(message);
    }
  },
);

export const createFields = createAsyncThunk(
  'ratingFields/create',
  async (name: Pick<RatingFields, 'name' | 'categoryId'>) => {
    try {
      const { data } = await API.post('/ratingFields', name);
      const ratings: RatingFields = data.data;
      toast.success(
        data.message || 'Rating Field created successfully',
      );
      return ratings;
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || 'Something went wrong');
      throw new Error(message);
    }
  },
);

export const updateFields = createAsyncThunk(
  'ratingFields/update',
  async (name: Pick<RatingFields, 'name' | 'id' | 'categoryId'>) => {
    const { id, ...rest } = name;
    try {
      const { data } = await API.patch(`/ratingFields/${id}`, rest);
      const ratings: RatingFields = data.data;
      toast.success(
        data.message || 'Rating Field created successfully',
      );
      return ratings;
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || 'Something went wrong');
      throw new Error(message);
    }
  },
);

export const deleteFields = createAsyncThunk(
  'ratingFields/delete',
  async (id: number) => {
    try {
      const { data } = await API.delete(`/ratingFields/${id}`);
      toast.success(
        data.message || 'Rating Fields deleted successfully',
      );
      return id;
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || 'Something went wrong');
      throw new Error(message);
    }
  },
);
