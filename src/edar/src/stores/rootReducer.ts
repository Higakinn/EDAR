import { combineReducers } from '@reduxjs/toolkit';
import shopInformationReducer from './shopInformation';
import userInfomationReducer from './userInfomation';

const rootReducer = combineReducers({
    shopInformation: shopInformationReducer,
    userInfomation: userInfomationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
