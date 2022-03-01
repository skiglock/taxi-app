import React, { useEffect } from "react";
import { useAppActions } from "../../hooks/useAppActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { TTaxiSort, TTaxiStatus } from "../../types/taxi";
import Button from "../Button";
import Preloader from "../Preloader";
import TaxiOrder from "../TaxiOrder";
import TaxiOrderFilters from "../TaxiOrderFilters";
import styles from "./taxiorderlist.module.scss";

const TaxiOrderList: React.FC = () => {
  const { orders, error, loading, page, limit, status, sort, total } =
    useAppSelector((state) => state.taxi);

  const {
    fetchTaxi,
    deleteTaxi,
    updateTaxi,
    setTaxiStatus,
    setTaxiSort,
    setTaxiPage,
  } = useAppActions();

  useEffect(() => {
    fetchTaxi(page, limit, status, sort);
  }, [status, sort, page, limit]);

  const handleDelete = (id: string) => {
    deleteTaxi(id);
  };

  const handleChangeStatus = (id: string, status: TTaxiStatus) => {
    updateTaxi(id, status);
  };

  const handleSelectStatus = (value: TTaxiStatus) => {
    setTaxiStatus(value);
  };

  const handleSelectSort = (value: TTaxiSort) => {
    setTaxiSort(value);
  };

  const handleClickLoadMore = () => {
    setTaxiPage();
  };
  return (
    <>
      {loading && <Preloader />}
      {error && !loading && <div>{error}</div>}
      <TaxiOrderFilters
        onSelectSort={handleSelectSort}
        onSelectStatus={handleSelectStatus}
      />
      <div className={styles.container}>
        {orders.length === 0 && !loading && (
          <div className={styles.empty}>Нету заказов</div>
        )}
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
      <div className={styles.loadMore}>
        {!loading && orders.length !== total && (
          <Button onClick={() => handleClickLoadMore()}>Загрузить еще</Button>
        )}
      </div>
    </>
  );
};

export default TaxiOrderList;
