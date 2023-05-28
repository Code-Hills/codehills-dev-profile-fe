/* eslint-disable prettier/prettier */
import {
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';

import authReducer from '../features/auth/loginSlice';
import profileSlice from '../../pages/profileSlice';
import userSlice from '../features/users/userSlice';
import deactivateReducer from '../features/admin/deactivateUserAcountSlice';
import activateUserReducer from '../features/admin/activateUserAcountSlice';

export function makeStore() {
  return configureStore({
    reducer: { auth: authReducer, profile: profileSlice, users:userSlice, deactivate:deactivateReducer, activate:activateUserReducer },
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
