// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';

// Configure the store and add the user reducer
const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export default store;
