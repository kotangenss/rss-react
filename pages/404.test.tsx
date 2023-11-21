import { cleanup, render, screen } from '@testing-library/react';
import NotFound from './404';

beforeEach(() => {
  jest.restoreAllMocks();
  cleanup();
});

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Not found page', () => {
  it('Render notFound component', async () => {
    render(<NotFound />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
