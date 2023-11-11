import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Main from '.';
import Details from '../../components/details';

beforeEach(() => {
  jest.restoreAllMocks();
  cleanup();
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  window.scrollTo = jest.fn();
});

describe('Main Component', () => {
  beforeEach(() => {
    jest.mock('../../components/searchSection', () => (): string => 'SearchSection');
    jest.mock('../../components/resultSection', () => (): string => ' ResultSection');
    window.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: { results: [], total: 0 } }),
    });
  });

  it('Render Main component without errors', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      );
    });

    expect(screen.getByText('Data provided by Marvel. © 2014 Marvel')).toBeInTheDocument();
  });

  it('Raising an error when clicking the Simulate Error button', () => {
    console.error = jest.fn();

    act(() => {
      render(
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      );
    });

    expect(() => {
      act(() => {
        const button = screen.getByText('Simulate Error');
        button.click();
      });
    }).toThrow();
  });

  it('Calling the delete method after clicking on main', () => {
    jest.spyOn(URLSearchParams.prototype, 'has').mockReturnValue(true);
    const spy = jest.spyOn(URLSearchParams.prototype, 'delete');

    act(() =>
      render(
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      )
    );

    act(() => {
      const main = screen.getByTestId('main');
      main.click();
    });

    expect(spy).toHaveBeenCalled();
  });
});

describe('Main Component with Details', () => {
  it('Clicking on a card opens a detailed card component', async () => {
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
    const result = { data: { results: [item], total: 1 } };
    window.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(result),
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Details />} />
            </Route>
          </Routes>
        </MemoryRouter>
      );
    });

    expect(window.fetch).toHaveBeenCalledTimes(1);

    await act(async () => screen.getByTestId(`link-${item.id}`).click());
    expect(window.fetch).toHaveBeenCalledTimes(2);

    expect(screen.getByText('Details')).toBeInTheDocument();
  });

  it('Successfully switches to next/prev pages', async () => {
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
    const result = { data: { results: [item, item, item], total: 5 } };
    window.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(result),
    });
    console.error = jest.fn();

    await act(async () => {
      render(
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Details />} />
            </Route>
          </Routes>
        </MemoryRouter>
      );
    });

    expect(window.fetch).toHaveBeenCalledTimes(1);

    waitFor(() => {
      expect(window.location.href).toBe(`http://localhost/?page=1`);
    });

    await act(async () => screen.getByText('Next').click());
    expect(window.fetch).toHaveBeenCalledTimes(2);
    waitFor(() => {
      expect(window.location.href).toBe(`http://localhost/?page=2`);
    });

    await act(async () => screen.getByText('Prev').click());
    expect(window.fetch).toHaveBeenCalledTimes(3);
    waitFor(() => {
      expect(window.location.href).toBe(`http://localhost/?page=1`);
    });
  });

  it('Close detailes component after close button is clicked', async () => {
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
    const result = { data: { results: [item], total: 1 } };
    window.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(result),
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Details />} />
            </Route>
          </Routes>
        </MemoryRouter>
      );
    });

    expect(window.fetch).toHaveBeenCalledTimes(1);

    await act(async () => screen.getByTestId(`link-${item.id}`).click());
    expect(window.fetch).toHaveBeenCalledTimes(2);

    expect(screen.getByText('Details')).toBeInTheDocument();

    const button = screen.getByText('x');

    await act(() => {
      button.click();
    });

    const details = await screen.queryByText('Details');

    expect(details).toBeNull();
  });
});
