import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import isLoadingReducer from './isLoadingSlice';
import dataReducer from './dataSlice';
import activeItemIdReducer from './activeItemIdSlice';
import { marvelApi } from './marvelApi';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    isLoading: isLoadingReducer,
    data: dataReducer,
    activeItemId: activeItemIdReducer,
    [marvelApi.reducerPath]: marvelApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(marvelApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
