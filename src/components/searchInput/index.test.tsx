import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchInput from '.';
import { Context } from '../contexts';
import { Data } from '../../interfaces/contexts';

beforeEach(() => {
  jest.restoreAllMocks();
  cleanup();
  localStorage.setItem('searchQuery', '');
});

describe('SearchInput', () => {
  it('Renders the input field and button with the provided props', () => {
    localStorage.setItem('searchQuery', 'spider');

    const placeholderText = 'Enter a search query';
    act(() => render(<SearchInput type="text" placeholder={placeholderText} isExistItems />));

    const input = screen.getByRole('textbox') as HTMLInputElement;

    waitFor(() => {
      expect(input).toBeInTheDocument();
      expect(input.getAttribute('type')).toBe('text');
      expect(input).toHaveTextContent('spider');
    });

    const buttonElement = screen.getByText('Search');
    expect(buttonElement).toBeInTheDocument();
  });

  it('Updates state when input value changes', () => {
    const result = { data: { results: ['Spider-Man', 'Iron Man'] } };
    window.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(result),
    });

    const placeholderText = 'Enter a search query';
    act(() => render(<SearchInput type="text" placeholder={placeholderText} isExistItems />));

    const input = screen.getByRole('textbox') as HTMLInputElement;

    expect(input).toBeTruthy();
    expect(input?.value).toBe('');

    if (input) {
      input.value = 'Spider-Man';
      input.dispatchEvent(new Event('input'));
    }

    waitFor(() => {
      expect(input?.value).toBe('Spider-Man');
    });
  });

  it('Fetch Data with Error', () => {
    window.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 123,
    });
    console.error = jest.fn();

    let data = { items: [], page: 11, limit: 13, total: 10 };
    const setData = jest.fn().mockImplementation((a): void => {
      data = a;
    });
    const value = { data, setData };

    act(() => {
      render(
        <Context.Provider value={value}>
          <MemoryRouter>
            <SearchInput type="text" placeholder="Search" isExistItems={false} />
          </MemoryRouter>
        </Context.Provider>
      );
    });

    waitFor(() => {
      expect(data).toBe({ items: undefined, page: 1, limit: 3, total: 0 });
    });
  });

  it('The handleInputChange function is called when input value changes', () => {
    act(() => {
      render(
        <MemoryRouter>
          <SearchInput type="text" placeholder="Search" isExistItems />
        </MemoryRouter>
      );
    });

    const input = screen.getByRole('textbox') as HTMLInputElement;

    act(() => {
      fireEvent.change(input, { target: { value: '123' } });
    });

    expect(input.value).toBe('123');
  });

  it('Run search with not empty input, successfully returns not empty items', () => {
    const result = { data: { results: ['Spider-Man', 'Iron Man'], total: 2 } };
    window.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(result),
    });
    const data = { items: undefined, page: 1, limit: 3, total: 0 };
    const setData = jest.fn();
    const value = { data, setData };
    act(() => {
      render(
        <Context.Provider value={value}>
          <MemoryRouter>
            <SearchInput type="text" placeholder="Search" isExistItems />
          </MemoryRouter>
        </Context.Provider>
      );
    });

    const button = screen.getByRole('button');
    const input = screen.getByRole('textbox') as HTMLInputElement;

    act(() => {
      fireEvent.change(input, { target: { value: '123' } });
      button.click();
    });

    waitFor(() => {
      expect(setData).toHaveBeenCalled();
      expect(localStorage.getItem('searchQuery')).toBe('123');
    });
  });

  it('Run search with empty input, successfully return empty items', () => {
    const result = { data: { results: ['Spider-Man', 'Iron Man'], total: 2 } };
    window.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(result),
    });
    const data: Data = { items: undefined, page: 1, limit: 3, total: 0 };
    const setData = jest.fn();
    const value = { data, setData };
    act(() => {
      render(
        <Context.Provider value={value}>
          <MemoryRouter>
            <SearchInput type="text" placeholder="Search" isExistItems />
          </MemoryRouter>
        </Context.Provider>
      );
    });

    const button = screen.getByRole('button');

    act(() => {
      button.click();
    });

    waitFor(() => {
      expect(setData).toHaveBeenCalled();
      expect(data.items?.length).toBe(0);
    });
  });

  it('Fetch All Characters successfully when first render component', () => {
    const result = { data: { results: ['Spider-Man', 'Iron Man'], total: 2 } };
    window.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(result),
    });

    let data = { items: undefined, page: 1, limit: 3, total: 0 };
    const setData = jest.fn().mockImplementation((a): void => {
      data = a;
    });
    const value = { data, setData };

    act(() => {
      render(
        <Context.Provider value={value}>
          <MemoryRouter>
            <SearchInput type="text" placeholder="Search" isExistItems={false} />
          </MemoryRouter>
        </Context.Provider>
      );
    });

    waitFor(() => {
      expect(data).toBe({ items: ['Spider-Man', 'Iron Man'], page: 1, limit: 3, total: 2 });
    });
  });

  it('Fetch characters successfully when first render component, get searchQuery from localstorage', () => {
    const result = { data: { results: ['Spider-Man', 'spider'], total: 0 } };
    window.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(result),
    });
    localStorage.setItem('searchQuery', 'spider');
    let data: Data = { items: undefined, page: 0, limit: 0, total: 0 };
    const setData = jest.fn().mockImplementation((a): void => {
      data = a;
    });
    const value = { data, setData };
    act(() =>
      render(
        <Context.Provider value={value}>
          <MemoryRouter>
            <SearchInput type="text" placeholder="Search" isExistItems={false} />
          </MemoryRouter>
        </Context.Provider>
      )
    );

    const button = screen.getByRole('button');

    act(() => {
      button.click();
    });

    waitFor(() => {
      expect(setData).toHaveBeenCalled();
      expect(data.items && data.items.length === 2).toBeTruthy();
    });
  });
});
