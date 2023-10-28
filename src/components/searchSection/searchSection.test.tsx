import { describe, expect, vi, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchSection from './index';

vi.mock('../searchInput', () => ({
  default: vi.fn(),
}));

describe('SearchSection', () => {
  it('Renders Marvel logo with a link', () => {
    render(<SearchSection handleResult={(): void => {}} handleStartSearch={(): void => {}} />);
    const marvelLogoLink = screen.getByRole('link', { name: /marvel logo/i });
    expect(marvelLogoLink).toBeDefined();
  });

  it('Renders the "superheroes" title', () => {
    render(<SearchSection handleResult={(): void => {}} handleStartSearch={(): void => {}} />);
    const superSpan = screen.getByText('super');
    const heroesSpan = screen.getByText('heroes');
    expect(superSpan).toBeDefined();
    expect(heroesSpan).toBeDefined();
  });

  it('Renders spider-man image', () => {
    render(<SearchSection handleResult={(): void => {}} handleStartSearch={(): void => {}} />);
    const spiderManImage = screen.getByAltText(/spider man/i);
    expect(spiderManImage).toBeDefined();
  });

  it('Renders search description text', () => {
    render(<SearchSection handleResult={(): void => {}} handleStartSearch={(): void => {}} />);
    const descriptionText = screen.getByText(/Welcome to the world's greatest comics API!/i);
    expect(descriptionText).toBeDefined();
  });
});
