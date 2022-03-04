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
          { title: "Все заказы", value: ETaxiStatus.DEFAULT },
          { title: "Новые", value: ETaxiStatus.NEW },
          { title: "Отмененные", value: ETaxiStatus.CANCELED },
        ]}
        onSelectChange={(e) => onSelectStatus(e.target.value as ETaxiStatus)}
      />
      <Select
        name={ETaxiFilters.SORT}
        options={[
          { title: "Все", value: ETaxiSort.DEFAULT },
          { title: "Сначала новые заказы", value: ETaxiSort.DESC },
          { title: "Сначала старые заказы", value: ETaxiSort.ASC },
        ]}
        onSelectChange={(e) => onSelectSort(e.target.value as ETaxiSort)}
      />
    </div>
  );
};

export default TaxiOrderFilters;
