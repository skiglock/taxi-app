import React from "react";
import { getGoogleMapsAdress } from "../../api/api";
import { ITaxiInfo } from "../../types/taxi";
import styles from "./taxiorderinfo.module.scss";

interface ITaxiOrderInfoProps {
  info: ITaxiInfo;
  title: string;
}

const TaxiOrderInfo: React.FC<ITaxiOrderInfoProps> = ({ info, title }) => {
  const { latitude, longitude, description } = info;

  return (
    <div className={styles.item}>
      {title}
      <div>
        <strong>Адрес:</strong> {longitude}
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export default TaxiOrderInfo;
