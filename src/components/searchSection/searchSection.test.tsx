import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchSection from './index';

describe('SearchSection', () => {
  it('Renders Marvel logo with a link', () => {
    render(<SearchSection handleResult={(): void => {}} />);
    const marvelLogoLink = screen.getByRole('link', { name: /marvel logo/i });
    expect(marvelLogoLink).toBeDefined();
  });

  it('Renders the "superheroes" title', () => {
    render(<SearchSection handleResult={(): void => {}} />);
    const superSpan = screen.getByText('super');
    const heroesSpan = screen.getByText('heroes');
    expect(superSpan).toBeDefined();
    expect(heroesSpan).toBeDefined();
  });

  it('Renders search input with placeholder', () => {
    render(<SearchSection handleResult={(): void => {}} />);
    const searchInput = screen.getByPlaceholderText(/Search.../i);
    expect(searchInput).toBeDefined();
  });

  it('Renders spider-man image', () => {
    render(<SearchSection handleResult={(): void => {}} />);
    const spiderManImage = screen.getByAltText(/spider man/i);
    expect(spiderManImage).toBeDefined();
  });

  it('Renders search description text', () => {
    render(<SearchSection handleResult={(): void => {}} />);
    const descriptionText = screen.getByText(/Welcome to the world's greatest comics API!/i);
    expect(descriptionText).toBeDefined();
  });
});
