import { act, cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import SearchInput from '.';
import { renderWithProviders } from '../../utils/test-utils';
import { AppStore } from '../../store';
import { item } from '../../mocks/api/handler';

beforeEach(() => {
  jest.restoreAllMocks();
  cleanup();
  localStorage.setItem('searchQuery', '');
});

describe('SearchInput', () => {
  it('Renders the input field and button with the provided props', () => {
    const placeholderText = 'Enter a search query';

    act(() => {
      renderWithProviders(<SearchInput type="text" placeholder={placeholderText} />, {
        preloadedState: {
          data: { value: { items: [item], page: 1, limit: 3, total: 0 } },
          search: { value: 'spider' },
        },
      });
    });

    const input = screen.getByTestId('input-search');

    expect(input).toBeInTheDocument();
    expect(input.getAttribute('type')).toBe('text');
    expect(input).toHaveValue('spider');

    const buttonElement = screen.getByText('Search');
    expect(buttonElement).toBeInTheDocument();
  });

  it('Updates state when input value changes', () => {
    const placeholderText = 'Enter a search query';
    act(() =>
      renderWithProviders(<SearchInput type="text" placeholder={placeholderText} />, {
        preloadedState: {
          data: { value: { items: [item], page: 1, limit: 3, total: 0 } },
          search: { value: '' },
        },
      })
    );

    const input = screen.getByTestId('input-search') as HTMLInputElement;

    expect(input).toBeTruthy();
    expect(input?.value).toBe('');

    if (input) {
      input.value = 'Spider-Man';
      input.dispatchEvent(new Event('input'));
    }

    expect(input?.value).toBe('Spider-Man');
  });

  it('The handleInputChange function is called when input value changes', () => {
    act(() =>
      renderWithProviders(<SearchInput type="text" placeholder="Search" />, {
        preloadedState: {
          data: { value: { items: [item], page: 1, limit: 3, total: 0 } },
          search: { value: 'spider' },
        },
      })
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;

    act(() => {
      fireEvent.change(input, { target: { value: '123' } });
    });

    expect(input.value).toBe('123');
  });

  it('Run search with not empty input, successfully returns not empty items', async () => {
    const newItem = { ...item, id: 2 };
    const store: AppStore = renderWithProviders(<SearchInput type="text" placeholder="Search" />, {
      preloadedState: {
        data: { value: { items: [newItem], page: 1, limit: 3, total: 0 } },
        isLoading: { main: false, details: false },
      },
    });

    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '123' } });

    await waitFor(() => {
      screen.getByTestId('button-search').click();
    });

    await waitFor(() => {
      const { data } = store.getState();

      expect(localStorage.getItem('searchQuery')).toBe('123');
      expect(data.value.items).not.toBe(undefined);
      expect(data.value.items.length).toBe(1);
    });
  });
});
