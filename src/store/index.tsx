import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { createWrapper } from 'next-redux-wrapper';
import { marvelApi } from './marvelApi';

const rootReducer = combineReducers({
  [marvelApi.reducerPath]: marvelApi.reducer,
});

export const store = (): ToolkitStore =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(marvelApi.middleware),
  });

export const setupStore = (preloadedState: PreloadedState<AppState>): ToolkitStore => {
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

export type RootState = ReturnType<typeof store>;
export type AppState = ReturnType<RootState['getState']>;
export type AppStore = ReturnType<typeof setupStore>;

export const wrapper = createWrapper<AppStore>(store, {
  debug: false,
});
