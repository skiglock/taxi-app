import React, { useEffect } from "react";
import { useAppActions } from "../../hooks/useAppActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  ETaxiFilters,
  ETaxiSorts,
  ETaxiStatuses,
  ITaxiStatus,
} from "../../types/taxi";
import Preloader from "../Preloader";
import Select from "../Select";
import TaxiOrder from "../TaxiOrder";
import styles from "./taxiorderlist.module.scss";

const TaxiOrderList: React.FC = () => {
  const { orders, error, loading } = useAppSelector((state) => state.taxi);
  const { fetchTaxi, deleteTaxi, updateTaxi } = useAppActions();

  useEffect(() => {
    fetchTaxi(1, 0, "", "DESC");
  }, []);

  const handleDelete = (id: string) => {
    deleteTaxi(id);
  };

  const handleChangeStatus = (id: string, status: ITaxiStatus) => {
    updateTaxi(id, status);
  };
  return (
    <>
      {loading && <Preloader />}
      {error && !loading && <div>{error}</div>}
      {orders.length === 0 && !loading && <div>Пустота</div>}
      <strong>Фильтры:</strong>
      <Select
        name={ETaxiFilters.RELEVANCE}
        options={[
          { title: ETaxiStatuses.CANCELED, value: "CANCELED" },
          { title: ETaxiStatuses.NEW, value: "NEW" },
        ]}
      />
      <Select
        name={ETaxiFilters.SORT}
        options={[
          { title: ETaxiSorts.ASC, value: "ASC" },
          { title: ETaxiSorts.DESC, value: "DESC" },
        ]}
      />
      <div className={styles.container}>
        {orders &&
          orders.map((order) => (
            <TaxiOrder
              key={order.id}
              order={order}
              handleDelete={() => handleDelete(order.id)}
              handleChangeStatus={() =>
                handleChangeStatus(order.id, "CANCELED")
              }
            />
          ))}
      </div>
    </>
  );
};

export default TaxiOrderList;
