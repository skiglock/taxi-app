import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppActions } from "../../hooks/useAppActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ETaxiSort, ETaxiStatus } from "../../types/taxi";
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

  const handleChangeStatus = (id: string, status: ETaxiStatus) => {
    updateTaxi(id, status);
  };

  const handleSelectStatus = (value: ETaxiStatus) => {
    setTaxiStatus(value);
  };

  const handleSelectSort = (value: ETaxiSort) => {
    setTaxiSort(value);
  };

  const handleClickLoadMore = () => {
    setTaxiPage();
  };
  return (
    <>
      {loading && <Preloader />}
      <TaxiOrderFilters
        onSelectSort={handleSelectSort}
        onSelectStatus={handleSelectStatus}
      />
      <div className={styles.createOrder}>
        <Link to="/order/new">
          <Button>Создать заказ</Button>
        </Link>
      </div>
      <div className={styles.container}>
        {orders.length === 0 && !loading && !error && (
          <div className={styles.empty}>Нету заказов</div>
        )}
        {error && !loading && <div className={styles.empty}>{error}</div>}

        {orders &&
          orders.map((order) => (
            <TaxiOrder
              key={order.id}
              order={order}
              onDelete={() => handleDelete(order.id)}
              onChangeStatus={() =>
                handleChangeStatus(order.id, ETaxiStatus.CANCELED)
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
