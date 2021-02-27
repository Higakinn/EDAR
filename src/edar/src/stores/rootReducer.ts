import { combineReducers } from '@reduxjs/toolkit';
import shopInformationReducer from './shopInformation';

const rootReducer = combineReducers({
    shopInformation: shopInformationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
