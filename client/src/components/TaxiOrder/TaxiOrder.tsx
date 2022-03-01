import React from "react";
import { ITaxi } from "../../types/taxi";
import TaxiOrderInfo from "../TaxiOrderInfo";
import styles from "./taxiorder.module.scss";
import { ETaxiStatuses } from "../../types/taxi";
import clsx from "clsx";
import Button from "../Button";
import { formatDate } from "../../utils/formatDate";

interface ITaxiOrderProps {
  order: ITaxi;
  handleDelete: () => void;
  handleChangeStatus: () => void;
}

const TaxiOrder: React.FC<ITaxiOrderProps> = ({
  order,
  handleDelete,
  handleChangeStatus,
}) => {
  const { phone, created_at, adress_from, adress_where, status } = order;

  return (
    <div className={styles.order}>
      <header className={styles.order__header}>
        <span>
          <strong>Телефон:</strong> {phone}
        </span>
        <time>
          <strong>Создан:</strong> {formatDate(created_at)}
        </time>
        <span
          className={clsx(
            styles.status,
            status === "NEW" && styles.status_new,
            status === "CANCELED" && styles.status_canceled
          )}
        >
          {status && ETaxiStatuses[status]}
        </span>
      </header>
      <div className={styles.order__body}>
        <TaxiOrderInfo come="Откуда" info={adress_from} />
        <TaxiOrderInfo come="Куда" info={adress_where} />
      </div>
      <footer className={styles.order__footer}>
        <Button variant="delete" onClick={() => handleDelete()}>
          Удалить
        </Button>
        {status === "NEW" && (
          <Button variant="cancel" onClick={() => handleChangeStatus()}>
            Отменить заказ
          </Button>
        )}
      </footer>
    </div>
  );
};

export default TaxiOrder;
