import { ChangeEvent } from 'react';
import styles from './index.module.scss';

export default function SelectInput({
  onSelectChange,
  options,
  value,
}: {
  onSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  value: string;
}): JSX.Element {
  return (
    <label htmlFor="selectedItems" className={styles['select-container']}>
      Select quantity:
      <select id="selectedItems" value={value} onChange={onSelectChange}>
        {options.map((optionValue) => (
          <option key={optionValue} value={optionValue}>
            {optionValue}
          </option>
        ))}
      </select>
    </label>
  );
}
