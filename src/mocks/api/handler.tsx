import { HttpResponse, http } from 'msw';

export const item = {
  id: 1,
  name: 'Item 1',
  thumbnail: {
    path: 'path/to/image1',
    extension: 'jpg',
  },
  description: 'Description of item 1',
  comics: {
    available: 2,
    returned: 2,
    collectionURI: 'collectionURI1',
    items: [
      {
        resourceURI: 'resourceURI1',
        name: 'Comics 1',
      },
      {
        resourceURI: 'resourceURI2',
        name: 'Comics 2',
      },
    ],
  },
  series: {
    available: 2,
    returned: 2,
    collectionURI: 'collectionURI3',
    items: [
      {
        resourceURI: 'resourceURI3',
        name: 'Series 1',
      },
      {
        resourceURI: 'resourceURI4',
        name: 'Series 2',
      },
    ],
  },
};

export const handlers = [
  http.get('https://gateway.marvel.com/v1/public/characters/1', () => {
    return HttpResponse.json({ data: { results: [item], total: 1 } });
  }),
  http.get('https://gateway.marvel.com/v1/public/characters/500', () => {
    return new HttpResponse(null, {
      status: 500,
    });
  }),
  http.get('https://gateway.marvel.com/v1/public/characters', () => {
    return HttpResponse.json({ data: { results: [item], total: 1 } });
  }),
];
