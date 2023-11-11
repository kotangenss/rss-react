import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Details from '.';
import { Context } from '../contexts';
import { Data } from '../../interfaces/contexts';

describe('Details', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  it('Renders Loader when isLoading is true', () => {
    const spy = jest.spyOn(window, 'scrollTo').mockImplementation(() => null);
    act(() => {
      const result = { data: { results: [{}] } };
      jest.spyOn(URLSearchParams.prototype, 'get').mockReturnValue('1');
      window.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(result),
      });

      render(
        <MemoryRouter>
          <Details />
        </MemoryRouter>
      );
    });

    waitFor(() => {
      expect(spy).toHaveBeenCalled();

      const loader = screen.queryByTestId('loader');
      expect(loader).toBeInTheDocument();
    });
  });

  it('Renders Loader when isLoading is false', () => {
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    const loader = screen.queryByTestId('loader');
    expect(loader).toBeNull();
  });

  it('Failed data from', async () => {
    console.error = jest.fn();

    jest.spyOn(window, 'scrollTo').mockImplementation(() => null);
    jest.spyOn(URLSearchParams.prototype, 'get').mockReturnValue('1');
    window.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 'test',
    });

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    waitFor(() => expect(console.error).toHaveBeenCalled());
  });

  it('Renders details correctly', () => {
    const item = {
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
    let data: Data = { items: [item], page: 1, limit: 1, total: 1 };
    const setData = jest.fn().mockImplementation((a) => {
      data = a;
    });
    const value = { data, setData };

    act(() => {
      render(
        <Context.Provider value={value}>
          <MemoryRouter>
            <Details />
          </MemoryRouter>
        </Context.Provider>
      );
    });

    waitFor(() => {
      expect(screen.getByText('Details')).toBeInTheDocument();
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
      expect(screen.getByText(item.comics.items[0].name)).toBeInTheDocument();
      expect(screen.getByText(item.comics.items[1].name)).toBeInTheDocument();
      expect(screen.getByText(item.series.items[0].name)).toBeInTheDocument();
      expect(screen.getByText(item.series.items[1].name)).toBeInTheDocument();
      expect((screen.getByRole('img') as HTMLImageElement).src).toBe(
        `${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}`
      );
      expect(screen.getByText('x')).toBeInTheDocument();
    });
  });
});
