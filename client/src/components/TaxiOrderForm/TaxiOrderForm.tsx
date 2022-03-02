import React, { ChangeEvent, useState } from "react";
import { ITaxiCoordinates, ITaxiLocation } from "../../types/taxi";
import Backdrop from "../Backdrop";
import Map from "../Map";
import styles from "./taxiorderform.module.scss";

interface ITaxiOrderFormProps {
  title: string;
  onChangeLocation: ({ latitude, longitude }: ITaxiCoordinates) => void;
  onChangeDescription: (text: string) => void;
  error: string;
}

const TaxiOrderForm: React.FC<ITaxiOrderFormProps> = ({
  title,
  onChangeLocation,
  onChangeDescription,
  error,
}) => {
  const [isMapActive, setIsMapActive] = useState(false);
  const [selectedAdress, setSelectedAdress] = useState("");
  const [description, setDescription] = useState("");

  const handleChangeLocation = ({
    latitude,
    longitude,
    adress,
  }: ITaxiLocation) => {
    onChangeLocation({ latitude, longitude });
    setSelectedAdress(adress);
    setIsMapActive(false);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    onChangeDescription(description);
  };

  return (
    <div>
      <div className={styles.TaxiOrderForm}>
        <input
          name="adress"
          style={{ cursor: "pointer" }}
          placeholder={title}
          readOnly
          value={selectedAdress}
          onClick={() => setIsMapActive(true)}
        />
        <textarea
          placeholder="Комментарий"
          onChange={(e) => handleChangeDescription(e)}
          value={description}
        ></textarea>
        {error}
      </div>
      {isMapActive && (
        <Backdrop>
          <div className={styles.MapModal}>
            <Map
              onChangeLocation={({ latitude, longitude, adress }) =>
                handleChangeLocation({ latitude, longitude, adress })
              }
            />
          </div>
        </Backdrop>
      )}
    </div>
  );
};

export default TaxiOrderForm;
