import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchSection from './index';

describe('SearchSection', () => {
  it('Renders Marvel logo with a link', () => {
    render(<SearchSection />);
    const marvelLogoLink = screen.getByRole('link', { name: /marvel logo/i });
    expect(marvelLogoLink).toBeDefined();
  });

  it('Renders the "superheroes" title', () => {
    render(<SearchSection />);
    const superSpan = screen.getByText('super');
    const heroesSpan = screen.getByText('heroes');
    expect(superSpan).toBeDefined();
    expect(heroesSpan).toBeDefined();
  });

  it('Renders search input with placeholder', () => {
    render(<SearchSection />);
    const searchInput = screen.getByPlaceholderText(/search for characters, comics, events, etc./i);
    expect(searchInput).toBeDefined();
  });

  it('Renders spider-man image', () => {
    render(<SearchSection />);
    const spiderManImage = screen.getByAltText(/spider man/i);
    expect(spiderManImage).toBeDefined();
  });

  it('Renders search description text', () => {
    render(<SearchSection />);
    const descriptionText = screen.getByText(
      /The Marvel Comics API is a tool to help developers everywhere/i
    );
    expect(descriptionText).toBeDefined();
  });
});
