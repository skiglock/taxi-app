import React, { useEffect, useState } from "react";
import { getGoogleMapsAdress } from "../../api/api";
import { ITaxiInfo } from "../../types/taxi";
import styles from "./taxiorderinfo.module.scss";

interface ITaxiOrderInfoProps {
  info: ITaxiInfo;
  title: string;
}

const TaxiOrderInfo: React.FC<ITaxiOrderInfoProps> = ({ info, title }) => {
  const { latitude, longitude, description } = info;

  const [formatAdess, setFormatAdress] = useState("");

  useEffect(() => {
    const changeLocationToAdress = async () => {
      const adress = await getGoogleMapsAdress(latitude, longitude);
      setFormatAdress(adress);
    };
    changeLocationToAdress();
  }, []);

  return (
    <div className={styles.item}>
      {title}
      <div>
        <strong>Адрес:</strong> {formatAdess}
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export default TaxiOrderInfo;
