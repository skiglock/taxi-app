import React from "react";
import { ETaxiFilters, ETaxiSort, ETaxiStatus } from "../../types/taxi";
import Select from "../Select";
import styles from "./taxiorderfilters.module.scss";

interface ITaxiOrdersFiltersProps {
  onSelectFilter: (
    filter: ETaxiFilters,
    value: ETaxiSort | ETaxiStatus
  ) => void;
}

const TaxiOrderFilters: React.FC<ITaxiOrdersFiltersProps> = ({
  onSelectFilter,
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
        onSelectChange={(e) =>
          onSelectFilter(ETaxiFilters.STATUS, e.target.value as ETaxiStatus)
        }
      />
      <Select
        name={ETaxiFilters.SORT}
        options={[
          { title: "Все", value: ETaxiSort.DEFAULT },
          { title: "Сначала новые заказы", value: ETaxiSort.DESC },
          { title: "Сначала старые заказы", value: ETaxiSort.ASC },
        ]}
        onSelectChange={(e) =>
          onSelectFilter(ETaxiFilters.SORT, e.target.value as ETaxiSort)
        }
      />
    </div>
  );
};

export default TaxiOrderFilters;
