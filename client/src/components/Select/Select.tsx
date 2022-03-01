import React, { ChangeEvent } from "react";
import {
  ETaxiFilters,
  ETaxiSorts,
  ETaxiStatuses,
  ITaxiSort,
  ITaxiStatus,
} from "../../types/taxi";

interface ISelectOptions {
  title: ETaxiStatuses | ETaxiSorts;
  value: ITaxiStatus | ITaxiSort;
}

interface ISelectProps {
  name: ETaxiFilters;
  options: ISelectOptions[];
  onSelectChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<ISelectProps> = ({ name, options, onSelectChange }) => {
  return (
    <select className={styles.filter} name={name} onChange={onSelectChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.title}
        </option>
      ))}
    </select>
  );
};

export default Select;
