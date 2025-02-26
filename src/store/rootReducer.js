import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import ticketSlice from './slices/ticketSlice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  tickets: ticketSlice,
});


export default rootReducer;