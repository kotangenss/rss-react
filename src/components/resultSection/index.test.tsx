import { act, cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResultSection from '.';
import { renderWithProviders } from '../../utils/test-utils';
import { AppStore } from '../../store';

beforeEach(() => {
  jest.restoreAllMocks();
  cleanup();
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

describe('resultSection', () => {
  it('Render appropriate message is displayed if no cards are present', async () => {
    await act(() => {
      renderWithProviders(
        <MemoryRouter>
          <ResultSection />
        </MemoryRouter>,
        {
          preloadedState: {
            data: { value: { items: undefined, page: 0, limit: 0, total: 0 } },
            isLoading: { main: false, details: false },
          },
        }
      );
    });

    const paginatonText = screen.getByText('No pages');
    const titleText = screen.getByText('Nothing found');

    expect(paginatonText).toBeInTheDocument();
    expect(titleText).toBeInTheDocument();
  });

  it('Renders Loader', async () => {
    act(() => {
      renderWithProviders(
        <MemoryRouter>
          <ResultSection />
        </MemoryRouter>,
        {
          preloadedState: {
            data: { value: { items: undefined, page: 0, limit: 0, total: 0 } },
            isLoading: { main: true, details: false },
          },
        }
      );
    });

    const loader = screen.getByTestId('loader');
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

    act(() => {
      renderWithProviders(
        <MemoryRouter>
          <ResultSection />
        </MemoryRouter>,
        {
          preloadedState: {
            data: { value: { items: [item, item, item], page: 1, limit: 3, total: 4 } },
            isLoading: { main: false, details: false },
          },
        }
      );
    });

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

    act(() => {
      renderWithProviders(
        <MemoryRouter>
          <ResultSection />
        </MemoryRouter>,
        {
          preloadedState: {
            data: { value: { items: [item], page: 1, limit: 3, total: 1 } },
            isLoading: { main: false, details: false },
          },
        }
      );
    });

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

  it('Click to next page button', async () => {
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

    const store: AppStore = renderWithProviders(
      <MemoryRouter>
        <ResultSection />
      </MemoryRouter>,
      {
        preloadedState: {
          data: { value: { items: [item], page: 1, limit: 1, total: 2 } },
          isLoading: { main: false, details: false },
        },
      }
    );

    const paginationText = screen.getByText('Page 1 of 2');
    const titleText = screen.getByText('Results (2)');
    const next = screen.getAllByRole('button')[1];

    expect(paginationText).toBeInTheDocument();
    expect(titleText).toBeInTheDocument();
    expect(next).toBeInTheDocument();

    await act(() => next.click());

    const { data } = store.getState();
    expect(data.value.items).toBe(undefined);
    expect(data.value.page).toBe(2);
  });

  it('Click to prev page button', async () => {
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

    const store: AppStore = renderWithProviders(
      <MemoryRouter>
        <ResultSection />
      </MemoryRouter>,
      {
        preloadedState: {
          data: { value: { items: [item], page: 2, limit: 1, total: 2 } },
          isLoading: { main: false, details: false },
        },
      }
    );

    const paginatonText = screen.getByText('Page 2 of 2');
    const titleText = screen.getByText('Results (2)');
    const prev = screen.getAllByRole('button')[0];

    expect(paginatonText).toBeInTheDocument();
    expect(titleText).toBeInTheDocument();

    await act(() => prev.click());

    const { data } = store.getState();
    expect(data.value.items).toBe(undefined);
    expect(data.value.page).toBe(1);
  });

  it('Successful update of the card limit on the page', async () => {
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

    const store: AppStore = renderWithProviders(
      <MemoryRouter>
        <ResultSection />
      </MemoryRouter>,
      {
        preloadedState: {
          data: { value: { items: [item], page: 1, limit: 3, total: 1 } },
          isLoading: { main: false, details: false },
        },
      }
    );

    const select = screen.getByRole('combobox');

    await act(() => {
      fireEvent.change(select, { target: { value: 6 } });
    });

    const { data } = store.getState();
    expect(data.value.items).toBe(undefined);
    expect(data.value.limit).toBe(6);
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

    act(() => {
      renderWithProviders(
        <MemoryRouter>
          <ResultSection />
        </MemoryRouter>,
        {
          preloadedState: {
            data: { value: { items: [item], page: 1, limit: 3, total: 1 } },
            isLoading: { main: false, details: false },
          },
        }
      );
    });

    act(() => {
      screen.getByTestId(`link-${item.id}`).click();
    });

    waitFor(() => {
      expect(window.location.href).toBe(
        `http://localhost/?page=1&details=${item.id}&name=${item.name}`
      );
    });
  });
});
