import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';

import activateUserReducer from '../features/admin/activateUserAcountSlice';
import deactivateReducer from '../features/admin/deactivateUserAcountSlice';
import authReducer from '../features/auth/loginSlice';
import markOneNotificationDefaultSlice from '../features/notifications/markOneNotificationSlice';
import notificationsSlice from '../features/notifications/notificationsSlice';
import profileSlice from '../features/profile/profileSlice';
import projectsSlice from '../features/projects/projectsSlice';
import themeSlice from '../features/theme/themeSlice';
import userSlice from '../features/users/userSlice';
import cycleSlice from '../slices/cycleSlice';
import dashboardSlice from '../slices/dashboardSlice';
import ratingFieldSlice from '../slices/ratingFieldSlice';
import ratingSlice from '../slices/ratingSlice';
import reviewSlice from '../slices/reviewSlice';
import reviewerSlice from '../slices/reviewerSlice';
import searchSlice from '../slices/searchSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      profile: profileSlice,
      theme: themeSlice,
      users: userSlice,
      deactivate: deactivateReducer,
      activate: activateUserReducer,
      cycle: cycleSlice,
      ratings: ratingSlice,
      ratingField: ratingFieldSlice,
      review: reviewSlice,
      reviewer: reviewerSlice,
      search: searchSlice,
      dashboard: dashboardSlice,
      projects: projectsSlice,
      notifications: notificationsSlice,
      markOneNotification: markOneNotificationDefaultSlice,
    },
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
