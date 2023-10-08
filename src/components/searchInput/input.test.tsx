import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchInput from './index';

describe('SearchInput', () => {
  it('Renders the input field and button with the provided props', () => {
    const placeholderText = 'Enter a search query';
    render(<SearchInput type="text" placeholder={placeholderText} />);

    const inputElement = screen.getByPlaceholderText(placeholderText);
    expect(inputElement).toBeDefined();
    expect(inputElement.getAttribute('type')).toBe('text');

    const buttonElement = screen.getByText('Search');
    expect(buttonElement).toBeDefined();
  });
});
