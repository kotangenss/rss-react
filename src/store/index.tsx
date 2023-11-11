import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import isLoadingReducer from './isLoadingSlice';
import dataReducer from './dataSlice';
import activeItemIdReducer from './activeItemIdSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    isLoading: isLoadingReducer,
    data: dataReducer,
    activeItemId: activeItemIdReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
