import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/index'; // Import your combined reducers

const store = configureStore({
  reducer: rootReducer,
});

export default store;