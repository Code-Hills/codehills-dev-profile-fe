import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import API from '@/api/api';
import { Review } from '@/interfaces/review.interface';

export const getAllReviews = createAsyncThunk(
  'reviews/getAllReviews',
  async () => {
    try {
      const { data } = await API.get('/reviews');
      const cyles: Review[] = data.data;
      return cyles;
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      throw new Error(message);
    }
  },
);

export const createReview = createAsyncThunk(
  'reviews/createReview',
  async (
    review: Pick<
      Review,
      'description' | 'ratings' | 'revieweeId' | 'reviewCycleId'
    >,
  ) => {
    try {
      const { data } = await API.post('/reviews', review);
      const reviewData: Review = data.data;
      toast.success(data.message || 'Review created successfully');
      return reviewData;
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || 'Something went wrong');
      throw new Error(message);
    }
  },
);

export const getAllDeveloperReviews = createAsyncThunk(
  'reviews/getAllDeveloperReviews',
  async ({
    revieweeId,
    cycleId,
  }: {
    revieweeId: string;
    cycleId: string;
  }) => {
    try {
      const { data } = await API.get(
        `/users/${revieweeId}/reviews/${cycleId}`,
      );
      const { reviews } = data;
      return reviews as Review[];
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      throw new Error(message);
    }
  },
);
