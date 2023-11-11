import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResultSection from '.';
import { Data } from '../../interfaces/contexts';
import { Context, IsLoadingContext } from '../contexts';

beforeEach(() => {
  jest.restoreAllMocks();
  cleanup();
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

describe('resultSection', () => {
  it('Render appropriate message is displayed if no cards are present', () => {
    let data: Data = { items: undefined, page: 0, limit: 0, total: 0 };
    const setData = jest.fn().mockImplementation((a) => {
      data = a;
    });
    const value = { data, setData };

    act(() =>
      render(
        <Context.Provider value={value}>
          <MemoryRouter>
            <ResultSection />
          </MemoryRouter>
        </Context.Provider>
      )
    );

    const paginatonText = screen.getByText('No pages');
    const titleText = screen.getByText('Nothing found');

    expect(paginatonText).toBeInTheDocument();
    expect(titleText).toBeInTheDocument();
  });

  it('Renders Loader', () => {
    let data: Data = { items: undefined, page: 0, limit: 0, total: 0 };
    const setData = jest.fn().mockImplementation((a): void => {
      data = a;
    });
    const value = { data, setData };

    const isLoading = true;
    const setIsLoading = jest.fn();
    const isLoadingValue = { isLoading, setIsLoading };

    act(() =>
      render(
        <Context.Provider value={value}>
          <IsLoadingContext.Provider value={isLoadingValue}>
            <MemoryRouter>
              <ResultSection />
            </MemoryRouter>
          </IsLoadingContext.Provider>
        </Context.Provider>
      )
    );

    const loader = screen.queryByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('Component renders the specified number of cards', () => {
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
            name: 'Comic 1',
          },
          {
            resourceURI: 'resourceURI2',
            name: 'Comic 2',
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
    let data: Data = { items: [item, item, item], page: 1, limit: 3, total: 4 };
    const setData = jest.fn().mockImplementation((a): void => {
      data = a;
    });
    const value = { data, setData };

    act(() =>
      render(
        <Context.Provider value={value}>
          <MemoryRouter>
            <ResultSection />
          </MemoryRouter>
        </Context.Provider>
      )
    );

    const paginatonText = screen.getByText('Page 1 of 2');
    const titleText = screen.getByText('Results (4)');
    const limitOptions = screen.getAllByRole('option');

    expect(paginatonText).toBeInTheDocument();
    expect(titleText).toBeInTheDocument();
    expect((limitOptions[0] as HTMLOptionElement).selected).toBeTruthy();
    expect((limitOptions[1] as HTMLOptionElement).selected).toBeFalsy();
    expect(screen.getAllByText(item.name)[0]).toBeInTheDocument();
    expect(screen.getAllByText(item.description)[0]).toBeInTheDocument();
    expect((screen.getAllByRole('img')[0] as HTMLImageElement).src).toBe(
      `http://localhost/${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}`
    );
  });

  it('Сomponent renders the relevant card data', () => {
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
            name: 'Comic 1',
          },
          {
            resourceURI: 'resourceURI2',
            name: 'Comic 2',
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
    let data: Data = { items: [item], page: 1, limit: 3, total: 1 };
    const setData = jest.fn().mockImplementation((a): void => {
      data = a;
    });
    const value = { data, setData };

    act(() =>
      render(
        <Context.Provider value={value}>
          <MemoryRouter>
            <ResultSection />
          </MemoryRouter>
        </Context.Provider>
      )
    );

    const paginatonText = screen.getByText('Page 1 of 1');
    const titleText = screen.getByText('Results (1)');

    expect(paginatonText).toBeInTheDocument();
    expect(titleText).toBeInTheDocument();
    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByText(item.description)).toBeInTheDocument();
    expect((screen.getByRole('img') as HTMLImageElement).src).toBe(
      `http://localhost/${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}`
    );
  });

  it('Click to next page button', () => {
    const item = {
      id: 1,
      name: 'Item 1',
      thumbnail: {
        path: 'path/to/image1',
        extension: 'jpg',
      },
      description: null,
      comics: {
        available: 2,
        returned: 2,
        collectionURI: 'collectionURI1',
        items: [
          {
            resourceURI: 'resourceURI1',
            name: 'Comic 1',
          },
          {
            resourceURI: 'resourceURI2',
            name: 'Comic 2',
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
    let data: Data = { items: [item], page: 1, limit: 1, total: 2 };
    const setData = jest.fn().mockImplementation((a): void => {
      data = a;
    });
    const value = { data, setData };

    act(() =>
      render(
        <Context.Provider value={value}>
          <MemoryRouter>
            <ResultSection />
          </MemoryRouter>
        </Context.Provider>
      )
    );

    const paginationText = screen.getByText('Page 1 of 2');
    const titleText = screen.getByText('Results (2)');
    const next = screen.getAllByRole('button')[1];

    expect(paginationText).toBeInTheDocument();
    expect(titleText).toBeInTheDocument();
    expect(next).toBeInTheDocument();

    act(() => next.click());

    waitFor(() => {
      expect(data.items).toBe(undefined);
      expect(data.page).toBe(2);
    });
  });

  it('Click to prev page button', () => {
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
            name: 'Comic 1',
          },
          {
            resourceURI: 'resourceURI2',
            name: 'Comic 2',
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
    let data: Data = { items: [item], page: 2, limit: 1, total: 2 };
    const setData = jest.fn().mockImplementation((a): void => {
      data = a;
    });
    const value = { data, setData };

    act(() =>
      render(
        <Context.Provider value={value}>
          <MemoryRouter>
            <ResultSection />
          </MemoryRouter>
        </Context.Provider>
      )
    );

    const paginatonText = screen.getByText('Page 2 of 2');
    const titleText = screen.getByText('Results (2)');
    const prev = screen.getAllByRole('button')[0];

    expect(paginatonText).toBeInTheDocument();
    expect(titleText).toBeInTheDocument();

    act(() => prev.click());

    waitFor(() => {
      expect(data.items).toBe(undefined);
      expect(data.page).toBe(2);
    });
  });

  it('Successful update of the card limit on the page', () => {
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
            name: 'Comic 1',
          },
          {
            resourceURI: 'resourceURI2',
            name: 'Comic 2',
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
    let data: Data = { items: [item], page: 1, limit: 1, total: 2 };
    const setData = jest.fn().mockImplementation((a): void => {
      data = a;
    });
    const value = { data, setData };

    act(() =>
      render(
        <Context.Provider value={value}>
          <MemoryRouter>
            <ResultSection />
          </MemoryRouter>
        </Context.Provider>
      )
    );

    const select = screen.getByRole('combobox');

    act(() => {
      fireEvent.change(select, { target: { value: 2 } });
    });

    waitFor(() => {
      expect(data.items).toBe(undefined);
      expect(data.limit).toBe(6);
    });
  });

  it('Navigates to the correct URL on item click', () => {
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
            name: 'Comic 1',
          },
          {
            resourceURI: 'resourceURI2',
            name: 'Comic 2',
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
    let data = { items: [item], page: 1, limit: 1, total: 2 };
    const setData = jest.fn().mockImplementation((a): void => {
      data = a;
    });
    const value = { data, setData };

    act(() =>
      render(
        <Context.Provider value={value}>
          <MemoryRouter>
            <ResultSection />
          </MemoryRouter>
        </Context.Provider>
      )
    );

    const link = screen.getByTestId(`link-${item.id}`);
    act(() => {
      link.click();
    });

    waitFor(() => {
      expect(window.location.href).toBe(
        `http://localhost/?page=1&details=${item.id}&name=${item.name}`
      );
    });
  });
});
