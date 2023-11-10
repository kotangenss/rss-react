import { cleanup, render, screen } from '@testing-library/react';
import Loader from '.';

beforeEach(() => {
  jest.restoreAllMocks();
  cleanup();
});

describe('Loader', () => {
  it('Renders the loading icon with the provided size', () => {
    const testSize = 's';
    render(<Loader size={testSize} />);
    const loadingIcon = screen.getByTestId(`loading-icon-${testSize}`);
    expect(loadingIcon).toBeInTheDocument();
  });

  it('Renders the loading message', () => {
    const testSize = 'm';
    render(<Loader size={testSize} />);
    const loadingMessage = screen.getByText('Please wait. Loading in progress');
    expect(loadingMessage).toBeInTheDocument();
  });
});
