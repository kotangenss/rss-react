import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from './index';

describe('Button', () => {
  it('Renders the button with the provided name', () => {
    const testName = 'Test Button';
    render(<Button name={testName} />);
    const button = screen.getByRole('button');
    expect(button.textContent).toBe(testName);
  });
});
