import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import isLoadingMainReducer from './isLoadingMainSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    isLoadingMain: isLoadingMainReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
