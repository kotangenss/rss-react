import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import SearchInput, { handleSearch, loadData } from './index';

describe('SearchInput', () => {
  it('Renders the input field and button with the provided props', () => {
    const result = { data: { results: ['Spider-Man', 'Iron Man'] } };
    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(result),
    });

    const placeholderText = 'Enter a search query';
    render(
      <SearchInput
        type="text"
        placeholder={placeholderText}
        handleResult={(): void => {}}
        handleStartSearch={(): void => {}}
        isExistItems
      />
    );

    const inputElement = screen.getByPlaceholderText(placeholderText);
    expect(inputElement).toBeDefined();
    expect(inputElement.getAttribute('type')).toBe('text');

    const buttonElement = screen.getByText('Search');
    expect(buttonElement).toBeDefined();
  });

  it('Updates state when input value changes', async () => {
    const result = { data: { results: ['Spider-Man', 'Iron Man'] } };
    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(result),
    });

    const { container } = render(
      <SearchInput
        type="text"
        placeholder="Enter a search query"
        handleResult={(): void => {}}
        handleStartSearch={(): void => {}}
        isExistItems
      />
    );
    const inputElement = container.querySelector('input');

    expect(inputElement).toBeTruthy();
    expect(inputElement?.value).toBe('');

    if (inputElement) {
      inputElement.value = 'Spider-Man';
      inputElement.dispatchEvent(new Event('input'));
    }

    await waitFor(() => {
      expect(inputElement?.value).toBe('Spider-Man');
    });
  });

  it('Fetch Data Successfully', async () => {
    const result = { data: { results: ['Spider-Man', 'Iron Man'] } };
    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(result),
    });

    const searchData = await loadData('', 1, 1);

    expect(searchData).toStrictEqual(result);
  });

  it('Fetch Data with Error', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 123,
    });

    expect(loadData('', 1, 1)).rejects.toThrowError(/123/);
  });

  it('Handle Search with Local Storage Data', async () => {
    localStorage.setItem('searchQuery', 'test constructor');

    const result = { data: { results: ['Spider-Man', 'Iron Man'] } };
    const handleResult = vi.fn();
    const handleStartSearch = vi.fn();

    render(
      <SearchInput
        type="text"
        placeholder=""
        handleResult={handleResult}
        handleStartSearch={handleStartSearch}
        isExistItems
      />
    );

    const setIsLoadingMock = vi.fn();
    const mockLoadData = vi.fn();
    mockLoadData.mockImplementation(async () => {
      return result;
    });

    handleSearch('test value', setIsLoadingMock, handleResult, handleStartSearch);
    localStorage.setItem('searchQuery', '');
  });

  it('Updates Component State on Input Change', async () => {
    const handleResult = vi.fn();
    const handleStartSearch = vi.fn();

    render(
      <SearchInput
        type="text"
        placeholder=""
        handleResult={handleResult}
        handleStartSearch={handleStartSearch}
        isExistItems
      />
    );
    searchInput.setState = vi.fn();
    const getSearchInputSpy = vi.spyOn(searchInput, 'setState');

    render(searchInput.render());
    const input = screen.getAllByPlaceholderText('asd')[0];

    fireEvent.change(input, { target: { value: '1' } });

    expect(getSearchInputSpy.mock.calls.length).toBe(1);
  });
});
