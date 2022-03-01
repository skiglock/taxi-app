import React, { useState } from "react";
import styles from "./taxiordercreate.module.scss";
import { ITaxiLocation } from "../../types/taxi";
import Map from "../Map";
import Button from "../Button";

const TaxiOrderCreate: React.FC = () => {
  const [isMapActive, setIsMapActive] = useState(true);

  const handleClickInput = () => {};

  const handlePickLocation = ({
    latitude,
    longitude,
    adress,
  }: ITaxiLocation) => {};
  const postData = {};
  return (
    <div className={styles.createOrder}>
      {isMapActive && (
        <Map
          onChangeLocation={({ latitude, longitude, adress }) =>
            handlePickLocation({ latitude, longitude, adress })
          }
        />
      )}

      <Button type="submit" variant="success">
        Отправить заявку
      </Button>
    </div>
  );
};

export default TaxiOrderCreate;
