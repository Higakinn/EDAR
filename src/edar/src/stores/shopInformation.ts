import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import type {
  Shop,
  Genre,
} from '../components/MainContent/SearchRestaurant/SearchRestaurant';
import { getGenre, getPosition, getShopList } from '../api/api';

type State = {
  position: {
    latitude: number;
    longitude: number;
  };
  isLoadedLocationInfo: boolean;
  isLoadedShopInfo: boolean;
  isProcessing: boolean;
  shops: Shop[];
  url: string;
  positionErrorMessage: string;
  shopErrorMessage: string;
  genre: string;
  genres: Genre[];
  expandedArray: boolean[];
  range: {
    code: string;
    label: string;
  };
  selectedShopIndex: number;
};

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
  positionErrorMessage: '',
  shopErrorMessage: '',
  genre: '',
  genres: [],
  expandedArray: [],
  range: {
    code: '3',
    label: '～1000m',
  },
  selectedShopIndex: 0,
};

const slice = createSlice({
  name: 'shopInformation',
  initialState,
  reducers: {
    setPosition: (
      state: State,
      action: PayloadAction<{ latitude: number; longitude: number }>
    ) => {
      state.position = action.payload;
      state.isLoadedLocationInfo = true;
    },
    setPositionErrorMessage: (state: State, action: PayloadAction<number>) => {
      switch (action.payload) {
        case 1:
          state.positionErrorMessage = '位置情報の利用が許可されていません';
          break;
        case 2:
          state.positionErrorMessage = 'デバイスの位置が判定できません';
          break;
        case 3:
          state.positionErrorMessage = 'タイムアウトしました';
          break;
      }
      state.isProcessing = false;
      state.isLoadedLocationInfo = false;
    },
    createURL: (state: State) => {
      state.isProcessing = true;
      let url =
        process.env['REACT_APP_RSTRNT_API_URL'] +
        '/hgs?lat=' +
        state.position.latitude +
        '&lng=' +
        state.position.longitude +
        '&range=' +
        state.range.code +
        '&order=1&genre=' +
        state.genre;
      if (state.url === url) {
        state.isProcessing = false;
      } else {
        state.url = url;
      }
    },
    updateRange: (
      state: State,
      action: PayloadAction<{ code: string; label: string }>
    ) => {
      state.range = action.payload;
    },
    setShops: (state: State, action: PayloadAction<Shop[]>) => {
      state.shops = action.payload;
      state.isLoadedShopInfo = true;
      state.isProcessing = false;
    },
    setIsProcessing: (state: State, action: PayloadAction<boolean>) => {
      state.isProcessing = action.payload;
    },
    setGenre: (state: State, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },
    setGenreList: (state: State, action: PayloadAction<Genre[]>) => {
      state.genres = action.payload;
    },
    initExpandedList: (state: State) => {
      let initExpanded: boolean[] = [];
      state.shops.forEach(() => {
        initExpanded.push(false);
      });
      state.expandedArray = initExpanded;
    },
    updateExpanded: (state: State, action: PayloadAction<number>) => {
      state.expandedArray[action.payload] = !state.expandedArray[
        action.payload
      ];
    },
    setShopErrorMessage: (state: State) => {
      state.shopErrorMessage =
        'お店の情報を取得できませんでした。再リロードしてください。';
      state.isLoadedShopInfo = false;
      state.isProcessing = false;
    },
    updateSelectedShopIndex: (state: State, action: PayloadAction<number>) => {
      state.selectedShopIndex = action.payload;
    },
  },
});

export function fetchPosition() {
  return async function (dispatch: Dispatch) {
    dispatch(setIsProcessing(true));
    try {
      const { latitude, longitude } = await getPosition();
      dispatch(setPosition({ latitude, longitude }));
    } catch (errorCode) {
      dispatch(setPositionErrorMessage(errorCode));
    }
  };
}

export function fetchGenreList() {
  return async function (dispatch: Dispatch) {
    try {
      dispatch(setGenreList(await getGenre()));
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchShopList(url: string) {
  return async function (dispatch: Dispatch) {
    try {
      dispatch(setShops(await getShopList(url)));
    } catch (error) {
      dispatch(setShopErrorMessage());
    }
  };
}
// action creatorをエクスポート
export const {
  setPosition,
  setPositionErrorMessage,
  createURL,
  setShops,
  setIsProcessing,
  setGenre,
  setGenreList,
  initExpandedList,
  updateExpanded,
  setShopErrorMessage,
  updateRange,
  updateSelectedShopIndex,
} = slice.actions;

// reducerをエクスポート
export const shopInformationReducer = slice.reducer;
