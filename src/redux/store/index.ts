/* eslint-disable prettier/prettier */
import {
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';

import authReducer from '../features/auth/loginSlice';
<<<<<<< HEAD
import profileSlice from '../features/profile/profileSlice';
import usersSlice from '../features/users/userSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      profile: profileSlice,
      users: usersSlice,
    },
=======
import profileSlice from '../../pages/profileSlice';
import userSlice from '../features/users/userSlice';
import deactivateReducer from '../features/admin/activateUserAcountSlice';

export function makeStore() {
  return configureStore({
    reducer: { auth: authReducer, profile: profileSlice, users:userSlice, deactivate:deactivateReducer },
>>>>>>> e2e2cdd (Fix conflict from src/modules/activities/profile/ProfileActivity.tsx")
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
