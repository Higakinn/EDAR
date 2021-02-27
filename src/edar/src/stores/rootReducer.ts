import { combineReducers } from '@reduxjs/toolkit';
import shopInformationReducer from './shopInformation';
import userInfomationReducer from './userInformation';

const rootReducer = combineReducers({
    shopInformation: shopInformationReducer,
    userInfomation: userInfomationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
