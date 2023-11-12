import { act, cleanup, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Details from '.';
import { renderWithProviders } from '../../utils/test-utils';
import { item } from '../../mocks/api/handler';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: (): jest.Mock => mockedUsedNavigate,
}));

describe('Details', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  it('Renders Loader when isLoading is true', async () => {
    const spy = jest.spyOn(window, 'scrollTo').mockImplementation(() => null);
    act(() => {
      renderWithProviders(
        <MemoryRouter>
          <Details />
        </MemoryRouter>,
        {
          preloadedState: {
            activeItemId: { value: 1 },
            isLoading: { main: false, details: true },
          },
        }
      );
    });

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();

    expect(spy).toHaveBeenCalled();
  });

  it('Not Renders Loader when isLoading is false', () => {
    act(() => {
      renderWithProviders(
        <MemoryRouter>
          <Details />
        </MemoryRouter>,
        {
          preloadedState: {
            isLoading: { main: false, details: false },
          },
        }
      );
    });

    const loader = screen.queryByTestId('loader');
    expect(loader).toBeNull();
  });

  it('Failed data from', async () => {
    console.error = jest.fn();

    jest.spyOn(window, 'scrollTo').mockImplementation(() => null);

    await act(() => {
      renderWithProviders(
        <MemoryRouter>
          <Details />
        </MemoryRouter>,
        {
          preloadedState: {
            activeItemId: { value: 500 },
            isLoading: { main: false, details: true },
          },
        }
      );
    });

    expect(console.error).toHaveBeenCalled();
    expect(mockedUsedNavigate).toHaveBeenCalled();
  });

  it('Renders details correctly', async () => {
    jest.spyOn(window, 'scrollTo').mockImplementation(() => null);
    await act(() => {
      renderWithProviders(
        <MemoryRouter>
          <Details />
        </MemoryRouter>,
        {
          preloadedState: {
            activeItemId: { value: 1 },
            isLoading: { main: false, details: true },
          },
        }
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Details')).toBeInTheDocument();
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
      expect(screen.getByText(item.comics.items[0].name)).toBeInTheDocument();
      expect(screen.getByText(item.comics.items[1].name)).toBeInTheDocument();
      expect(screen.getByText(item.series.items[0].name)).toBeInTheDocument();
      expect(screen.getByText(item.series.items[1].name)).toBeInTheDocument();
      expect((screen.getByRole('img') as HTMLImageElement).src).toBe(
        `http://localhost/${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}`
      );
      expect(screen.getByText('x')).toBeInTheDocument();
    });
  });

  it('Successfully close component', async () => {
    console.error = jest.fn();

    await act(() => {
      renderWithProviders(
        <MemoryRouter>
          <Details />
        </MemoryRouter>,
        {
          preloadedState: {
            activeItemId: { value: 1 },
            isLoading: { main: false, details: true },
          },
        }
      );
    });

    await act(() => {
      screen.getByText('x').click();
    });

    expect(mockedUsedNavigate).toHaveBeenCalled();
  });
});
