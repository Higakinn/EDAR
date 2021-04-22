import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState } from './types';

const initialState: InitialState = {
  isLoggedIn: false,
  user: {
    email: null,
    displayName: null,
    photoURL: null,
  },
};

const slice = createSlice({
  name: 'userInformation',
  initialState,
  reducers: {
    updateUserInformation: (
      state: InitialState,
      action: PayloadAction<{
        email: string | null;
        displayName: string | null;
        photoURL: string | null;
      }>
    ) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    clearUserInformation: (state: InitialState) => {
      state.user = { email: null, displayName: null, photoURL: null };
      state.isLoggedIn = false;
    },
  },
});

// action creatorをエクスポート
export const { updateUserInformation, clearUserInformation } = slice.actions;

// reducerをエクスポート
export const userInformationReducer = slice.reducer;
