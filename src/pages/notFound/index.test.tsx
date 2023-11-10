import { act, cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import NotFound from '.';

beforeEach(() => {
  jest.restoreAllMocks();
  cleanup();
});

describe('Not found page', () => {
  it('404 page appears when following an incorrect route', async () => {
    const incorrectRoute = '/incorrect-route';

    render(
      <MemoryRouter initialEntries={[incorrectRoute]}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    const notFoundText = screen.getByText('Something went wrong');
    expect(notFoundText).toBeTruthy();
  });

  it('Should navigate to the main page when "Go to main page" button is clicked', async () => {
    const incorrectRoute = '/incorrect-route';

    render(
      <MemoryRouter initialEntries={[incorrectRoute]}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    const button = screen.getByText('Go to main page');

    act(() => {
      button.click();
    });

    expect(window.location.pathname).toBe('/');
  });
});
