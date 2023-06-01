import { createSlice } from '@reduxjs/toolkit';

import Keys from '@/utils/keys';
import Secure from '@/utils/secureLs';

interface InitialState {
  theme: 'light' | 'dark' | 'system';
}

const initialState: InitialState = {
  theme:
    (Secure.get(Keys.APP_THEME_KEY) as 'light' | 'dark') || 'system',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';

      Secure.set(Keys.APP_THEME_KEY, state.theme);
    },

    setTheme(state, action) {
      state.theme = action.payload;

      Secure.set(Keys.APP_THEME_KEY, state.theme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
