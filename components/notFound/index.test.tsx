import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import NotFound from '.';

beforeEach(() => {
  jest.restoreAllMocks();
  cleanup();
});

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Not found page', () => {
  it('Should navigate to the main page when "Go to main page" button is clicked', async () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });

    render(<NotFound />);

    act(() => {
      screen.getByText('Go to main page').click();
    });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith('/');
    });
  });
});
