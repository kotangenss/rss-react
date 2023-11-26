import { cleanup, render, screen } from '@testing-library/react';
import SearchSection from './index';

beforeEach(() => {
  jest.restoreAllMocks();
  cleanup();
});

jest.mock('../searchInput', () => (): string => 'searchInput');

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

  it('Renders spider-man image', () => {
    render(<SearchSection />);
    const spiderManImage = screen.getByAltText(/spider man/i);
    expect(spiderManImage).toBeDefined();
  });

  it('Renders search description text', () => {
    render(<SearchSection />);
    const descriptionText = screen.getByText(/Welcome to the world's greatest comics API!/i);
    expect(descriptionText).toBeDefined();
  });
});
