import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export interface QueryParams {
  limit?: string;
  offset?: string;
  nameStartsWith?: string;
}

function createParam(name: string, value: string | undefined): string {
  return value && value !== '' ? `${name}=${value}&` : '';
}

function prepareParams(queryParams: QueryParams): string {
  return (
    createParam('limit', queryParams.limit) +
    createParam('offset', queryParams.offset) +
    createParam('nameStartsWith', queryParams.nameStartsWith)
  );
}

export const marvelApi = createApi({
  reducerPath: 'marvelApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://gateway.marvel.com/v1/public/' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
    return undefined;
  },
  endpoints: (build) => ({
    getCharacters: build.query({
      query: (queryParams: QueryParams = {}) =>
        `characters?ts=1&apikey=${process.env.NEXT_PUBLIC_API_KEY}&hash=${
          process.env.NEXT_PUBLIC_HASH
        }&${prepareParams(queryParams)}`,
    }),
    getCharacter: build.query({
      query: (id: number | undefined) =>
        `characters/${id}?ts=1&apikey=${process.env.NEXT_PUBLIC_API_KEY}&hash=${process.env.NEXT_PUBLIC_HASH}`,
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetCharacterQuery,
  util: { getRunningQueriesThunk },
} = marvelApi;

export const { getCharacters, getCharacter } = marvelApi.endpoints;
