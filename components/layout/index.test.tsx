import { render, screen } from '@testing-library/react';
import Layout from '.';

describe('Layout', () => {
  it('Successfully render component', () => {
    render(Layout({ children: null }));

    expect(screen.getByTestId('body')).toBeInTheDocument();
  });
});
