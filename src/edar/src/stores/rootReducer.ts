import { combineReducers } from '@reduxjs/toolkit';
import { shopInformationReducer } from './shopInformation';
import { userInformationReducer } from './userInformation';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { connectRouter } from 'connected-react-router';
import * as History from 'history';

export const history = History.createBrowserHistory();

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['shopInformation', 'userInformation']
};

const shopsPersistConfig = {
  key: 'shopInformation',
  storage: storage,
  whitelist: ['shops'],
};

export const rootReducer = combineReducers({
  shopInformation: persistReducer(shopsPersistConfig, shopInformationReducer),
  userInformation: userInformationReducer,
  router: connectRouter(history),
});

export const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
