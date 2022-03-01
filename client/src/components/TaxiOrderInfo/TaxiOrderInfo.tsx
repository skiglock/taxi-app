import React from "react";
import { ITaxiInfo } from "../../types/taxi";
import styles from "./taxiorderinfo.module.scss";

interface ITaxiOrderInfoProps {
  info: ITaxiInfo;
  come: string;
}

const TaxiOrderInfo: React.FC<ITaxiOrderInfoProps> = ({ info, come }) => {
  const { latitude, longitude, description } = info;
  return (
    <div className={styles.item}>
      {come}
      <div>
        <strong>Широта:</strong> {latitude}
      </div>
      <div>
        <strong>Долгота:</strong> {longitude}
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export default TaxiOrderInfo;
