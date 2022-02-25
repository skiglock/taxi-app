import React from "react";
import styles from "./App.scss";
import { data } from "./data";
import clsx from "clsx";

enum EOrderStatus {
  NEW = "NEW",
  CANCELED = "CANCELED",
}

const App: React.FC<{}> = () => {
  const renderOrders = data.map((item) => (
    <article key={item._id} className={styles.taxiOrder}>
      <header className={styles.taxiOrder__header}>
        <span className={styles.taxiOrder__phone}>{item.phone}</span>
        <time className={styles.taxiOrder__time}>{item.created_at}</time>
      </header>
      <div className={styles.taxiOrder__body}>
        <ul className={styles.taxiOrder__adress}>
          <h3 className={styles.taxiOrder__route}>Откуда</h3>
          <li className={styles.taxiOrder__latitude}>
            Долгота: {item.adress_from.latitude}
          </li>
          <li className={styles.taxiOrder__longitude}>
            Широта: {item.adress_from.longitude}
          </li>

          <li className={styles.taxiOrder__description}>
            {item.adress_from.description}
          </li>
        </ul>
        <ul className={styles.taxiOrder__adress}>
          <h3 className={styles.taxiOrder__route}>Куда</h3>
          <li className={styles.taxiOrder__latitude}>
            Долгота: {item.adress_where.latitude}
          </li>
          <li className={styles.taxiOrder__longitude}>
            Широта: {item.adress_where.longitude}
          </li>
          <li className={styles.taxiOrder__description}>
            {item.adress_where.description}
          </li>
        </ul>
      </div>
      <footer className={styles.taxiOrder__footer}>
        <button
          disabled={item.status === EOrderStatus.CANCELED}
          className={clsx(
            styles.taxiOrder__status,
            item.status === EOrderStatus.NEW && styles.taxiOrder__status_new,
            item.status === EOrderStatus.CANCELED &&
              styles.taxiOrder__status_canceled
          )}
        >
          {item.status}
        </button>
      </footer>
    </article>
  ));
  return <main className={styles.taxiOrders}>{renderOrders}</main>;
};

export default App;
