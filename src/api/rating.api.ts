/* eslint-disable sonarjs/no-duplicate-string */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import API from '@/api/api';
import { Ratings } from '@/interfaces/rating.interface';

export const getAllRatings = createAsyncThunk(
  'ratings/fetch',
  async () => {
    try {
      const { data } = await API.get('/ratingCategories');
      const ratings: Ratings[] = data.data;
      return ratings;
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      throw new Error(message);
    }
  },
);

export const createRating = createAsyncThunk(
  'ratings/create',
  async (name: Pick<Ratings, 'name'>) => {
    try {
      const { data } = await API.post('/ratingCategories', name);
      const ratings: Ratings = data.data;
      toast.success(data.message || 'Rating created successfully');
      return ratings;
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || 'Something went wrong');
      throw new Error(message);
    }
  },
);

export const updateRating = createAsyncThunk(
  'ratings/update',
  async (name: Pick<Ratings, 'name' | 'id'>) => {
    const { id, ...rest } = name;
    try {
      const { data } = await API.patch(
        `/ratingCategories/${id}`,
        rest,
      );
      const ratings: Ratings = data.data;
      toast.success(data.message || 'Rating created successfully');
      return ratings;
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || 'Something went wrong');
      throw new Error(message);
    }
  },
);

export const deleteRating = createAsyncThunk(
  'ratings/delete',
  async (id: number) => {
    try {
      const { data } = await API.delete(`/ratingCategories/${id}`);
      toast.success(data.message || 'Rating deleted successfully');
      return id;
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || 'Something went wrong');
      throw new Error(message);
    }
  },
);
