import styles from './select.module.scss';

export default function SelectInput({
  onSelectChange,
  options,
}: {
  onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}): JSX.Element {
  return (
    <label htmlFor="selectedItems" className={styles['select-container']}>
      Select quantity:
      <select id="selectedItems" defaultValue={options[0]} onChange={onSelectChange}>
        {options.map((optionValue) => (
          <option key={optionValue} value={optionValue}>
            {optionValue}
          </option>
        ))}
      </select>
    </label>
  );
}
