import React from "react";
import {
  ETaxiFilters,
  ETaxiSorts,
  ETaxiStatuses,
  TTaxiSort,
  TTaxiStatus,
} from "../../types/taxi";
import Select from "../Select";
import styles from "./taxiorderfilters.module.scss";

interface ITaxiOrdersFiltersProps {
  onSelectStatus: (e: TTaxiStatus) => void;
  onSelectSort: (e: TTaxiSort) => void;
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
          { title: ETaxiStatuses.ALL, value: "" },
          { title: ETaxiStatuses.CANCELED, value: "CANCELED" },
          { title: ETaxiStatuses.NEW, value: "NEW" },
        ]}
        onSelectChange={(e) => onSelectStatus(e.target.value as TTaxiStatus)}
      />
      <Select
        name={ETaxiFilters.SORT}
        options={[
          { title: ETaxiSorts.ALL, value: "" },
          { title: ETaxiSorts.ASC, value: "ASC" },
          { title: ETaxiSorts.DESC, value: "DESC" },
        ]}
        onSelectChange={(e) => onSelectSort(e.target.value as TTaxiSort)}
      />
    </div>
  );
};

export default TaxiOrderFilters;
