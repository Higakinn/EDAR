import { configureStore } from '@reduxjs/toolkit';
import { persistedReducer } from './stores/rootReducer';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { history } from './stores/rootReducer';

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, routerMiddleware(history)]
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
