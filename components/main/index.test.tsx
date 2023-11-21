import { render, act, cleanup, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { item } from '../../src/mocks/api/handler';
import Main from '.';

beforeEach(() => {
  jest.restoreAllMocks();
  cleanup();
});

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Main Component', () => {
  beforeEach(() => {
    jest.mock('../searchSection', () => (): string => 'SearchSection');
    jest.mock('../resultSection', () => (): string => ' ResultSection');
  });

  it('Render Main component without errors', () => {
    const data = { results: [], limit: 1, total: 0, offset: 0, count: 0 };
    render(<Main mainData={data} />);

    expect(screen.getByText('Data provided by Marvel. © 2014 Marvel')).toBeInTheDocument();
  });

  it('Raising an error when clicking the Simulate Error button', () => {
    const data = { results: [], limit: 1, total: 0, offset: 0, count: 0 };
    render(<Main mainData={data} />);
    console.error = jest.fn();

    expect(() => {
      act(() => {
        screen.getByText('Simulate Error').click();
      });
    }).toThrow();
  });
});

describe('Main Component with Details', () => {
  it('Close detailes component after click on main is clicked', async () => {
    const mainData = { results: [item], limit: 1, total: 0, offset: 0, count: 1 };
    const detailData = { results: [item], limit: 1, total: 0, offset: 0, count: 1 };
    const pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });
    jest.spyOn(URLSearchParams.prototype, 'has').mockImplementation(() => true);

    render(<Main mainData={mainData} detailData={detailData} />);

    expect(screen.getByText('Details')).toBeInTheDocument();

    await waitFor(() => {
      screen.getByTestId('main').click();
    });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith('?');
    });
  });
});
