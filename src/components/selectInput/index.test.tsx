import { render, fireEvent, cleanup } from '@testing-library/react';
import SelectInput from '.';

beforeEach(() => {
  jest.restoreAllMocks();
  cleanup();
});

describe('Select Input', () => {
  it('Renders SelectInput with options', () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];
    const value = 'Option 2';
    const onSelectChange = jest.fn();

    const { getByLabelText, getByDisplayValue } = render(
      <SelectInput onSelectChange={onSelectChange} options={options} value={value} />
    );

    const selectContainer = getByLabelText('Select quantity:');
    const selectElement = getByDisplayValue(value);

    expect(selectContainer).toBeInTheDocument();
    expect(selectElement).toBeInTheDocument();

    options.forEach((optionValue) => {
      expect(selectElement).toHaveTextContent(optionValue);
    });
  });

  it('Calls onSelectChange when select value changes', () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];
    const value = 'Option 2';
    const onSelectChange = jest.fn();

    const { getByLabelText } = render(
      <SelectInput onSelectChange={onSelectChange} options={options} value={value} />
    );

    const selectElement = getByLabelText('Select quantity:');

    fireEvent.change(selectElement, { target: { value: 'Option 1' } });

    expect(onSelectChange).toHaveBeenCalled();
  });
});
