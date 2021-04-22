import { createSelector } from 'reselect';
import type { RootState } from '../rootReducer';

const userSelector = (state: RootState) => state.userInformation;

export const getUser = createSelector([userSelector], (state) => state.user);

export const getIsLoggedIn = createSelector(
  [userSelector],
  (state) => state.isLoggedIn
);
