import { render, act, cleanup, fireEvent, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { item } from '../../src/mocks/api/handler';
import ResultSection from '.';

beforeEach(() => {
  jest.restoreAllMocks();
  cleanup();
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('resultSection', () => {
  it('Render appropriate message is displayed if no cards are present', async () => {
    const apiResp = { results: [], limit: 1, total: 1, offset: 0, count: 0 };

    render(<ResultSection mainData={apiResp} />);

    const paginatonText = screen.getByText('No pages');
    const titleText = screen.getByText('Nothing found');

    expect(paginatonText).toBeInTheDocument();
    expect(titleText).toBeInTheDocument();
  });

  it('Сomponent renders the relevant card data', () => {
    const apiResp = { results: [item], limit: 1, total: 1, offset: 0, count: 1 };

    render(<ResultSection mainData={apiResp} />);

    const paginatonText = screen.getByText('Page 1 of 1');
    const titleText = screen.getByText('Results (1)');

    expect(paginatonText).toBeInTheDocument();
    expect(titleText).toBeInTheDocument();
    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByText(item.description)).toBeInTheDocument();
    expect((screen.getByRole('img') as HTMLImageElement).src).toBe(
      'http://localhost/_next/image?url=http%3A%2F%2Flocalhost%2Fportrait_uncanny.jpg&w=828&q=75'
    );
  });

  it('Click to next page button', async () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });

    const apiResp = { results: [item], limit: 1, total: 2, offset: 0, count: 1 };

    render(<ResultSection mainData={apiResp} />);

    const paginationText = screen.getByText('Page 1 of 2');
    const titleText = screen.getByText('Results (2)');
    const next = screen.getAllByRole('button')[1];

    expect(paginationText).toBeInTheDocument();
    expect(titleText).toBeInTheDocument();
    expect(next).toBeInTheDocument();

    await act(() => next.click());

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith('?limit=3&page=2');
  });

  it('Click to prev page button', async () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });
    jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation(() => '2');

    const apiResp = { results: [item], limit: 1, total: 2, offset: 1, count: 1 };

    render(<ResultSection mainData={apiResp} />);

    const paginatonText = screen.getByText('Page 2 of 2');
    const titleText = screen.getByText('Results (2)');
    const prev = screen.getAllByRole('button')[0];

    expect(paginatonText).toBeInTheDocument();
    expect(titleText).toBeInTheDocument();

    await act(() => prev.click());

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith('?limit=3&page=1');
  });

  it('Successful update of the card limit on the page', async () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });

    const apiResp = { results: [item], limit: 1, total: 2, offset: 1, count: 1 };

    render(<ResultSection mainData={apiResp} />);

    const select = screen.getByRole('combobox');

    await act(() => {
      fireEvent.change(select, { target: { value: 6 } });
    });

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith('?limit=6&page=1');
  });
});
