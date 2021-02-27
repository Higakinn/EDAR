import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
    isLogining: boolean
    user: {
        email: string | null
        displayName: string | null
        photoURL: string | null
    }
}

const initialState: State = {
    isLogining: false,
    user: {
        email: null,
        displayName: null,
        photoURL: null,
    }
};

const slice = createSlice({
    name: 'userInfomation',
    initialState,
    reducers: {
        updateUserInfomation: (state: State, action: PayloadAction<{
            email: string | null,
            displayName: string | null,
            photoURL: string | null
        }>) => {
            state.user = action.payload;
            state.isLogining = true;
        },
        clearUserInfomation: (state: State) => {
            state.user = { email: null, displayName: null, photoURL: null };
            state.isLogining = false;
        }
    }
});

// action creatorをエクスポート
export const {
    updateUserInfomation,
    clearUserInfomation,
} = slice.actions;

// reducerをエクスポート
export default slice.reducer;
