import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import SearchInput from '.';

beforeEach(() => {
  jest.restoreAllMocks();
  cleanup();
});

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('SearchInput', () => {
  it('Renders the input field and button with the provided props', () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });
    const placeholderText = 'Enter a search query';
    jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation(() => 'spider');

    act(() => {
      render(<SearchInput type="text" placeholder={placeholderText} />);
    });

    const input = screen.getByTestId('input-search');

    expect(input).toBeInTheDocument();
    expect(input.getAttribute('type')).toBe('text');
    expect(input).toHaveValue('spider');

    const buttonElement = screen.getByText('Search');
    expect(buttonElement).toBeInTheDocument();
  });

  it('Updates state when input value changes', () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });
    const placeholderText = 'Enter a search query';
    act(() => render(<SearchInput type="text" placeholder={placeholderText} />));

    const input = screen.getByTestId('input-search') as HTMLInputElement;

    expect(input).toBeTruthy();
    expect(input?.value).toBe('');

    if (input) {
      input.value = 'Spider-Man';
      input.dispatchEvent(new Event('input'));
    }

    expect(input?.value).toBe('Spider-Man');
  });

  it('Click button successfully routes', async () => {
    const placeholderText = 'Enter a search query';
    jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation(() => 'spider');
    const pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });

    act(() => {
      render(<SearchInput type="text" placeholder={placeholderText} />);
    });

    await waitFor(() => {
      screen.getByTestId('button-search').click();
    });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith('?search=spider&page=1&limit=3');
    });
  });
});
