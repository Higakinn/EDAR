import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Shop, Genre } from '../components/MainContent/MainContent';

type State = {
    position: {
        latitude: number
        longitude: number
    }
    isLoadedLocationInfo: boolean
    isLoadedShopInfo: boolean
    isProcessing: boolean
    shops: Shop[]
    url: string
    errorMessage: string
    genre: string
    genreList: Genre[]
    expanded: boolean[]
}

const initialState: State = {
    position: {
        latitude: 0,
        longitude: 0,
    },
    isLoadedLocationInfo: false,
    isLoadedShopInfo: false,
    isProcessing: false,
    shops: [],
    url: '',
    errorMessage: '',
    genre: '',
    genreList: [],
    expanded: [],
};

const slice = createSlice({
    name: 'shopInfomation',
    initialState,
    reducers: {
        setPosition: (state: State, action: PayloadAction<{ latitude: number, longitude: number }>) => {
            state.position = action.payload;
            state.isLoadedLocationInfo = true;
        },
        setErrorMessage: (state: State, action: PayloadAction<number>) => {
            switch (action.payload) {
                case 1:
                    state.errorMessage = "位置情報の利用が許可されていません";
                    break;
                case 2:
                    state.errorMessage = "デバイスの位置が判定できません";
                    break;
                case 3:
                    state.errorMessage = "タイムアウトしました";
                    break;
            }
            state.isProcessing = false;
            state.isLoadedLocationInfo = false;
        },
        createURL: (state: State) => {
            state.isProcessing = true;
            let url = process.env['REACT_APP_RSTRNT_API_URL'] +
                '/hgs?lat=' +
                state.position.latitude +
                '&lng=' +
                state.position.longitude +
                '&range=4&order=1&genre=' +
                state.genre;
            if (state.url === url) {
                state.isProcessing = false;
            } else {
                state.url = url;
            }
        },
        setShops: (state: State, action: PayloadAction<Shop[]>) => {
            state.shops = action.payload;
            state.isLoadedShopInfo = true;
        },
        setIsLoadedShopInfo: (state: State, action: PayloadAction<boolean>) => {
            state.isLoadedShopInfo = action.payload;
        },
        setIsProcessing: (state: State, action: PayloadAction<boolean>) => {
            state.isProcessing = action.payload;
        },
        setGenre: (state: State, action: PayloadAction<string>) => {
            state.genre = action.payload;
        },
        setGenreList: (state: State, action: PayloadAction<Genre[]>) => {
            state.genreList = action.payload;
        },
        initExpandedList: (state: State) => {
            let initExpanded: boolean[] = [];
            state.shops.forEach(() => {
                initExpanded.push(false);
            });
            state.expanded = initExpanded;
        },
        updateExpanded: (state: State, action: PayloadAction<number>) => {
            state.expanded[action.payload] = !state.expanded[action.payload];
        }
    }
});

// action creatorをエクスポート
export const {
    setPosition,
    setErrorMessage,
    createURL,
    setShops,
    setIsLoadedShopInfo,
    setIsProcessing,
    setGenre,
    setGenreList,
    initExpandedList,
    updateExpanded,
} = slice.actions;

// reducerをエクスポート
export default slice.reducer;
