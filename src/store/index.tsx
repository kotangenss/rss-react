import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import isLoadingReducer from './isLoadingSlice';
import dataReducer from './dataSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    isLoading: isLoadingReducer,
    data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
