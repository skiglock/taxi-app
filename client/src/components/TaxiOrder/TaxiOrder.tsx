import React from "react";
import { ETaxiStatus, ITaxi } from "../../types/taxi";
import TaxiOrderInfo from "../TaxiOrderInfo";
import styles from "./taxiorder.module.scss";
import clsx from "clsx";
import Button from "../Button";
import { formatDate } from "../../utils/formatDate";

interface ITaxiOrderProps {
  order: ITaxi;
  onDelete: () => void;
  onChangeStatus: () => void;
}

const TaxiOrder: React.FC<ITaxiOrderProps> = ({
  order,
  onDelete,
  onChangeStatus,
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
            status === ETaxiStatus.NEW && styles.status_new,
            status === ETaxiStatus.CANCELED && styles.status_canceled
          )}
        >
          {(status === ETaxiStatus.NEW && "Новый") ||
            (status === ETaxiStatus.CANCELED && "Отмененный")}
        </span>
      </header>
      <div className={styles.order__body}>
        <TaxiOrderInfo title="Откуда" info={adress_from} />
        <TaxiOrderInfo title="Куда" info={adress_where} />
      </div>
      <footer className={styles.order__footer}>
        <Button variant="delete" onClick={() => onDelete()}>
          Удалить
        </Button>
        {status === ETaxiStatus.NEW && (
          <Button variant="cancel" onClick={() => onChangeStatus()}>
            Отменить заказ
          </Button>
        )}
      </footer>
    </div>
  );
};

export default TaxiOrder;
