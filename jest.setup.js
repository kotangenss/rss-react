import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { server } from './src/mocks/api/server';
import { marvelApi } from './src/store/marvelApi';
import { setupStore } from './src/store';

const store = setupStore({});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  store.dispatch(marvelApi.util.resetApiState());
});

afterAll(() => server.close());
