import { render, act, cleanup, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { item } from '../../src/mocks/api/handler';
import Details from '.';

beforeEach(() => {
  jest.restoreAllMocks();
  cleanup();
});

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Details', () => {
  it('Renders details correctly', async () => {
    const apiResp = { offset: 0, limit: 3, total: 1, count: 1, results: [item] };

    render(<Details detailData={apiResp} />);

    await waitFor(() => {
      expect(screen.getByText('Details')).toBeInTheDocument();
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
      expect(screen.getByText(item.comics.items[0].name)).toBeInTheDocument();
      expect(screen.getByText(item.comics.items[1].name)).toBeInTheDocument();
      expect(screen.getByText(item.series.items[0].name)).toBeInTheDocument();
      expect(screen.getByText(item.series.items[1].name)).toBeInTheDocument();
      expect((screen.getByRole('img') as HTMLImageElement).src).toBe(
        'http://localhost/_next/image?url=http%3A%2F%2Flocalhost%2Fportrait_uncanny.jpg&w=640&q=75'
      );
      expect(screen.getByText('x')).toBeInTheDocument();
    });
  });

  it('Successfully close component', async () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });

    const apiResp = { offset: 0, limit: 3, total: 1, count: 1, results: [item] };

    await act(() => {
      render(<Details detailData={apiResp} />);
    });

    await act(() => {
      screen.getByText('x').click();
    });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith('?');
    });
  });
});
