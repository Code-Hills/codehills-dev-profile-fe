import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
  } from '@reduxjs/toolkit';
  import axios from 'axios';
  
  interface ProfileState {
    profile: string | null;
    loading: boolean;
    error: string | null;
  }
  
  interface AuthError {
    message: string;
    code?: string;
  }
  
  const initialState: ProfileState = {
    profile: null,
    loading: false,
    error: null,
  };
  
  const fetchProfileSlice = createSlice({
    name: 'Profile',
    initialState,
    reducers: {
      profileStart(state) {
        state.loading = true;
        state.error = null;
      },
      profileSuccess(state, action: PayloadAction<string>) {
        state.loading = false;
        state.error = null;
        state.profile = action.payload;
      },
      profileFailure(state, action: PayloadAction<string>) {
        state.loading = false;
        state.error = action.payload;
      },
    },
  });
  
  export const {
    profileStart,
    profileSuccess,
    profileFailure,
  } = fetchProfileSlice.actions;
  
//   export const fetchProfilet = () => async (dispatch) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem(
//             'pulseToken'
//           )}`,
//         },
//       };
//       console.log(
//         'Tkennnnn',
//         localStorage.getItem('pulseToken')
//       );
//       const response = await db.get(
//         '/users/my-profile',
//         config
//       );
//       dispatch({
//         type: FETCH_PROFILE,
//         response: response.data,
//       });
  
//       //console.log("response from the db", response.data)
//     } catch (error) {
//       dispatch({
//         type: FETCH_PROFILE_ERROR,
//         response: error.response.data.message,
//       });
//     }
//   };
  
  
  export const fetchProfile = createAsyncThunk(
    'auth/fetchProfile',
    async () => {
      try {
       const getpro = await axios.get(
          `${
            import.meta.env.VITE_PUBLIC_DEFAULT_API
          }/api/v1/profile`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem(
                'pulseToken',
              )}`,
            },
          },
        );
        console.log(getpro, "this os profile")
      } catch (error: any) {
        throw error.response.data;
      }
    },
  );
  
  export default fetchProfileSlice.reducer;
  