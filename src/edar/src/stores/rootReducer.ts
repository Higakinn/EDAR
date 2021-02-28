import { combineReducers } from '@reduxjs/toolkit';
import shopInformationReducer from './shopInformation';
import userInformationReducer from './userInformation';

const rootReducer = combineReducers({
    shopInformation: shopInformationReducer,
    userInformation: userInformationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
