import { act, cleanup, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Main from '.';
import Details from '../../components/details';
import { renderWithProviders } from '../../utils/test-utils';
import { item } from '../../mocks/api/handler';

beforeEach(() => {
  jest.restoreAllMocks();
  cleanup();
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  window.scrollTo = jest.fn();
  console.error = jest.fn();
});

describe('Main Component', () => {
  beforeEach(() => {
    jest.mock('../../components/searchSection', () => (): string => 'SearchSection');
    jest.mock('../../components/resultSection', () => (): string => ' ResultSection');
    console.error = jest.fn();

    window.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: { results: [], total: 0 } }),
    });
  });

  it('Render Main component without errors', async () => {
    await act(async () => {
      renderWithProviders(
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      );
    });

    expect(screen.getByText('Data provided by Marvel. © 2014 Marvel')).toBeInTheDocument();
  });

  it('Raising an error when clicking the Simulate Error button', () => {
    act(() => {
      renderWithProviders(
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
      renderWithProviders(
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
    await act(() => {
      renderWithProviders(
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Details />} />
            </Route>
          </Routes>
        </MemoryRouter>,
        {
          preloadedState: {
            isLoading: { main: false, details: false },
          },
        }
      );
    });

    await act(() => {
      waitFor(() => {
        screen.getByTestId(`link-${item.id}`).click();
      });
    });

    waitFor(() => {
      expect(screen.getByText('Details')).toBeInTheDocument();
    });
  });

  it('Successfully switches to next/prev pages', async () => {
    await act(() => {
      renderWithProviders(
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Details />} />
            </Route>
          </Routes>
        </MemoryRouter>,
        {
          preloadedState: {
            isLoading: { main: false, details: false },
          },
        }
      );
    });

    waitFor(() => {
      screen.getByText('Next').click();
    });

    waitFor(() => {
      expect(window.location.href).toBe(`http://localhost/?page=2`);
    });

    waitFor(() => {
      screen.getByText('Prev').click();
    });

    waitFor(() => {
      expect(window.location.href).toBe(`http://localhost/?page=1`);
    });
  });

  it('Close detailes component after close button is clicked', async () => {
    await act(() => {
      renderWithProviders(
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Details />} />
            </Route>
          </Routes>
        </MemoryRouter>,
        {
          preloadedState: {
            isLoading: { main: false, details: false },
          },
        }
      );
    });

    await act(() => {
      waitFor(() => {
        screen.getByTestId(`link-${item.id}`).click();
      });
    });

    waitFor(() => {
      expect(screen.getByText('Details')).toBeInTheDocument();
    });

    await act(() => {
      waitFor(() => {
        screen.getByText('x').click();
      });
    });

    await waitFor(() => {
      expect(screen.queryByText('Details')).toBeNull();
    });
  });
});
