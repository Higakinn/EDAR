import { createSelector } from 'reselect';
import type { RootState } from '../rootReducer';

const shopSelector = (state: RootState) => state.shopInformation;

export const getShops = createSelector([shopSelector], (state) => state.shops);

export const getIsProcessing = createSelector(
  [shopSelector],
  (state) => state.isProcessing
);

export const getIsLoadedLocationInfo = createSelector(
  [shopSelector],
  (state) => state.isLoadedLocationInfo
);

export const getIsLoadedShopInfo = createSelector(
  [shopSelector],
  (state) => state.isLoadedShopInfo
);

export const getPositionErrorMessage = createSelector(
  [shopSelector],
  (state) => state.positionErrorMessage
);

export const getShopErrorMessage = createSelector(
  [shopSelector],
  (state) => state.shopErrorMessage
);

export const getExpandedArray = createSelector(
  [shopSelector],
  (state) => state.expandedArray
);

export const getSelectedShopIndex = createSelector(
  [shopSelector],
  (state) => state.selectedShopIndex
);

export const getRange = createSelector([shopSelector], (state) => state.range);

export const getPosition = createSelector(
  [shopSelector],
  (state) => state.position
);

export const getGenre = createSelector([shopSelector], (state) => state.genre);

export const getUrl = createSelector([shopSelector], (state) => state.url);

export const getGenres = createSelector(
  [shopSelector],
  (state) => state.genres
);
