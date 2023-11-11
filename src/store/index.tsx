import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import isLoadingReducer from './isLoadingSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    isLoading: isLoadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
