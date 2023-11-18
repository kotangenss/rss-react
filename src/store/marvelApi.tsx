import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
  endpoints: (build) => ({
    getCharacters: build.query({
      query: (queryParams: QueryParams = {}) =>
        `characters?ts=1&apikey=${import.meta.env.VITE_API_KEY}&hash=${
          import.meta.env.VITE_HASH
        }&${prepareParams(queryParams)}`,
    }),
    getCharacter: build.query({
      query: (id: number | undefined) =>
        `characters/${id}?ts=1&apikey=${import.meta.env.VITE_API_KEY}&hash=${
          import.meta.env.VITE_HASH
        }`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterQuery } = marvelApi;
