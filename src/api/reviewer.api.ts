import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import API from '@/api/api';

export const getDeveloperReviewers = createAsyncThunk(
  'reviewers/getDeveloperReviewers',
  async ({
    developerId,
    reviewCyleId,
  }: {
    developerId: string;
    reviewCyleId: string;
  }) => {
    try {
      const { data } = await API.get(
        `/users/${developerId}/reviewers/${reviewCyleId}`,
      );
      return data.reviewers;
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      throw new Error(message);
    }
  },
);

export const addReviewer = createAsyncThunk(
  'reviewers/createReviewer',
  async (params: { reviewCycleId: string; reviewerId: string }) => {
    try {
      const { data } = await API.post('/users/reviewers', params);
      toast.success(data.message || 'Reviewer added successfully');
      return params;
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || 'Something went wrong');
      throw new Error(message);
    }
  },
);