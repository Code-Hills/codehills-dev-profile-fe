import { createAsyncThunk } from '@reduxjs/toolkit';

import API from '@/api/api';
import { Role } from '@/interfaces/user.interface';

export const searchUsers = createAsyncThunk(
  'search/searchUsers',
  async (params: { searchTerm?: string; role: Role }) => {
    try {
      const { data } = await API.get(
        `/search/users?searchTerm=${params.searchTerm ?? ''}&role=${
          params.role
        }`,
      );
      return data.users;
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      throw new Error(message);
    }
  },
);
