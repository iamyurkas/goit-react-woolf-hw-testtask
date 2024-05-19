import { configureStore } from '@reduxjs/toolkit';
import favoriteReducer from './reducers/reducer';

const store = configureStore({
  reducer: {
    favorite: favoriteReducer,
  },
});

export default store;