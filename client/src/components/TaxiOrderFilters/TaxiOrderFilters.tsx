import React from "react";
import { ETaxiFilters, ETaxiSort, ETaxiStatus } from "../../types/taxi";
import Select from "../Select";
import styles from "./taxiorderfilters.module.scss";

interface ITaxiOrdersFiltersProps {
  onSelectStatus: (e: ETaxiStatus) => void;
  onSelectSort: (e: ETaxiSort) => void;
}

const TaxiOrderFilters: React.FC<ITaxiOrdersFiltersProps> = ({
  onSelectStatus,
  onSelectSort,
}) => {
  return (
    <div className={styles.orderFilters}>
      <Select
        name={ETaxiFilters.STATUS}
        options={[
          { title: "Все", value: ETaxiStatus.DEFAULT },
          { title: "Отмененные", value: ETaxiStatus.CANCELED },
          { title: "Новые", value: ETaxiStatus.NEW },
        ]}
        onSelectChange={(e) => onSelectStatus(e.target.value as ETaxiStatus)}
      />
      <Select
        name={ETaxiFilters.SORT}
        options={[
          { title: "Все", value: ETaxiSort.DEFAULT },
          { title: "Сначала новые", value: ETaxiSort.DESC },
          { title: "Сначала старые", value: ETaxiSort.ASC },
        ]}
        onSelectChange={(e) => onSelectSort(e.target.value as ETaxiSort)}
      />
    </div>
  );
};

export default TaxiOrderFilters;
