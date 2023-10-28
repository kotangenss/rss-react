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

  it('Applies the provided className', () => {
    const testName = 'Test Button';
    const testClassName = 'custom-class';
    render(<Button name={testName} className={testClassName} />);
    const button = screen.getByRole('button');
    const classAttribute = button.getAttribute('class');
    expect(classAttribute).toContain(testClassName);
    expect(classAttribute).not.toContain('button');
  });
});
