/* eslint-disable sonarjs/no-duplicate-string */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import API from '@/api/api';
import { IReviewer } from '@/interfaces/review.interface';

export const getDeveloperReviewers = createAsyncThunk(
  'reviewers/getDeveloperReviewers',
  async ({
    developerId,
    reviewCycleId,
    status,
  }: {
    developerId?: string | null;
    reviewCycleId: string;
    status?: string | null;
  }) => {
    try {
      const { data } = await API.get(
        `/users/reviewers/${reviewCycleId}?${
          !developerId
            ? ''
            : `developerId=${developerId} ${
                status ? `&status=${status}` : ``
              }`
        }}`,
      );
      return data.reviewers.map((reviewer: IReviewer) => ({
        ...reviewer,
        reviewCycleId,
      }));
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

export const approveReviewer = createAsyncThunk(
  'reviewers/approveReviewer',
  async (reviewer: IReviewer): Promise<IReviewer> => {
    try {
      const { data } = await API.patch(
        `/users/${reviewer.developer?.id}/reviewers/approve`,
        {
          reviewerId: reviewer.reviewerId,
          reviewCycleId: reviewer.reviewCycleId,
        },
      );
      toast.success(data.message || 'Reviewer approved successfully');
      return { ...reviewer, status: 'approved' };
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || 'Something went wrong');
      throw new Error(message);
    }
  },
);

export const rejectReviewer = createAsyncThunk(
  'reviewers/rejectReviewer',
  async (reviewer: IReviewer): Promise<IReviewer> => {
    try {
      const { data } = await API.patch(
        `/users/${reviewer.developer?.id}/reviewers/reject`,
        {
          reviewerId: reviewer.reviewerId,
          reviewCycleId: reviewer.reviewCycleId,
        },
      );
      toast.success(data.message || 'Reviewer rejected successfully');
      return {
        ...reviewer,
        status: 'rejected',
      };
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || 'Something went wrong');
      throw new Error(message);
    }
  },
);
