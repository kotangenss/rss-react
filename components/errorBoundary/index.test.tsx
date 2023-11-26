import { act, cleanup, render, screen } from '@testing-library/react';
import ErrorBoundary from '.';

const { location } = window;
const { reload } = location;

beforeEach(() => {
  jest.restoreAllMocks();
  cleanup();
  Object.defineProperty(window, 'location', { value: { reload: jest.fn() } });
});

afterEach(() => {
  window.location.reload = reload;
});

describe('errorBoundary', () => {
  it('Correct operation of the ErrorBoundary component', async () => {
    const ComponentThatThrows = (): never => {
      throw new Error('');
    };
    console.error = jest.fn();
    console.log = jest.fn();

    await act(() =>
      render(
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <ComponentThatThrows />
        </ErrorBoundary>
      )
    );

    const titleText = screen.getByText('Something went wrong');
    const button = screen.getByRole('button');

    expect(titleText).toBeInTheDocument();
    expect(window.location.reload).toHaveBeenCalledTimes(0);

    button.click();
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });
});
