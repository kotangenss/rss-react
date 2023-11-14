import { PropsWithChildren, ReactElement } from 'react';
import { RenderOptions, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { PreloadedState } from '@reduxjs/toolkit';
import { setupStore, AppStore, RootState } from '../store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
): AppStore {
  setupListeners(store.dispatch);

  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  render(ui, { wrapper: Wrapper, ...renderOptions });

  return store;
}
