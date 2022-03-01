import React, { ChangeEvent } from "react";
import { ETaxiFilters, ETaxiSort, ETaxiStatus } from "../../types/taxi";

import styles from "./select.module.scss";

interface ISelectOptions {
  title: string;
  value: ETaxiStatus | ETaxiSort;
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
