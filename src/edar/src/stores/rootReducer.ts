import { combineReducers } from '@reduxjs/toolkit';
import shopInfomationReducer from './shopInfomation';

const rootReducer = combineReducers({
    shopInfomation: shopInfomationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
