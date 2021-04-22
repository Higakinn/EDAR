import { Dispatch } from '@reduxjs/toolkit';
import { getGenre, getPosition, getShopList } from '../../api/api';
import {
  setIsProcessing,
  setPosition,
  setPositionErrorMessage,
  setGenreList,
  setShops,
  setShopErrorMessage,
} from './reducers';

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
