import { cleanup, render, screen } from '@testing-library/react';
import Loader from '.';

beforeEach(() => {
  jest.restoreAllMocks();
  cleanup();
});

describe('Loader', () => {
  it('Renders the loading line', () => {
    render(<Loader />);
    const loadingMessage = screen.getByTestId('loader');
    expect(loadingMessage).toBeInTheDocument();
  });
});
