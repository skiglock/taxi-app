import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppActions } from "../../hooks/useAppActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ETaxiFilters, ETaxiSort, ETaxiStatus } from "../../types/taxi";
import Button from "../Button";
import Preloader from "../Preloader";
import TaxiOrder from "../TaxiOrder";
import TaxiOrderFilters from "../TaxiOrderFilters";
import styles from "./taxiorderlist.module.scss";

const TaxiOrderList: React.FC = () => {
  const { orders, error, loading, page, limit, filters, total } =
    useAppSelector((state) => state.taxi);

  const { status, sort } = filters;

  const { fetchTaxi, deleteTaxi, updateTaxi, setTaxiFilter, setTaxiPage } =
    useAppActions();

  useEffect(() => {
    fetchTaxi(page, limit, status, sort);
  }, [page, limit, status, sort]);

  return (
    <>
      {loading && <Preloader />}
      <TaxiOrderFilters
        onSelectFilter={(filter, value) => setTaxiFilter(filter, value)}
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
              onDelete={() => deleteTaxi(order.id)}
              onChangeStatus={() => updateTaxi(order.id, ETaxiStatus.CANCELED)}
            />
          ))}
      </div>
      <div className={styles.loadMore}>
        {!loading && orders.length !== total && (
          <Button onClick={() => setTaxiPage()}>Загрузить еще</Button>
        )}
      </div>
    </>
  );
};

export default TaxiOrderList;
