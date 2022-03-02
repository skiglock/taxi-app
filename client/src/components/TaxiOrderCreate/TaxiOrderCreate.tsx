import React, { SyntheticEvent, useState } from "react";
import styles from "./taxiordercreate.module.scss";
import Button from "../Button";
import TaxiOrderForm from "../TaxiOrderForm";
import { useAppActions } from "../../hooks/useAppActions";
import { ITaxiCoordinates } from "../../types/taxi";
import { useAppSelector } from "../../hooks/useAppSelector";

const adressInfo = {
  latitude: 0,
  longitude: 0,
};

const TaxiOrderCreate: React.FC = () => {
  const { createTaxi } = useAppActions();
  const { loading } = useAppSelector((state) => state.taxi);
  const [phone, setPhone] = useState("");
  const [locationFrom, setLocationFrom] =
    useState<ITaxiCoordinates>(adressInfo);
  const [locationWhere, setLocationWhere] =
    useState<ITaxiCoordinates>(adressInfo);
  const [descriptionFrom, setDescriptionFrom] = useState("");
  const [descriptionWhere, setDescriptionWhere] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const data = {
      phone,
      adress_from: {
        latitude: locationFrom.latitude,
        longitude: locationFrom.longitude,
        description: descriptionFrom,
      },
      adress_where: {
        latitude: locationWhere.latitude,
        longitude: locationWhere.longitude,
        description: descriptionWhere,
      },
    };
    createTaxi(data);
  };

  return (
    <form className={styles.createOrder} onSubmit={handleSubmit}>
      <h1>Вызвать такси</h1>
      <input
        name="phone"
        type="text"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        placeholder="Ваш телефон"
      />
      <TaxiOrderForm
        title="Откуда"
        onChangeLocation={({ latitude, longitude }) =>
          setLocationFrom({ latitude, longitude })
        }
        onChangeDescription={(text) => setDescriptionFrom(text)}
      />
      <TaxiOrderForm
        title="Куда"
        onChangeLocation={({ latitude, longitude }) =>
          setLocationWhere({ latitude, longitude })
        }
        onChangeDescription={(text) => setDescriptionWhere(text)}
      />
      <div className={styles.createOrder__post}>
        <Button type="submit" variant="success">
          {loading ? "Загрузка" : "Отправить заявку"}
        </Button>
      </div>
    </form>
  );
};

export default TaxiOrderCreate;
