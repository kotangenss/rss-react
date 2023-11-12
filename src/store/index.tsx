import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import searchReducer from './searchSlice';
import isLoadingReducer from './isLoadingSlice';
import dataReducer from './dataSlice';
import activeItemIdReducer from './activeItemIdSlice';
import { marvelApi } from './marvelApi';

const rootReducer = combineReducers({
  search: searchReducer,
  isLoading: isLoadingReducer,
  data: dataReducer,
  activeItemId: activeItemIdReducer,
  [marvelApi.reducerPath]: marvelApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(marvelApi.middleware),
});

export const setupStore = (preloadedState: PreloadedState<RootState>): ToolkitStore => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(marvelApi.middleware),
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
