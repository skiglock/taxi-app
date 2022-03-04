import React, { useEffect, useState } from "react";
import styles from "./taxiordercreate.module.scss";
import Button from "../Button";
import { FormProvider, useForm } from "react-hook-form";
import Map from "../Map";
import TaxiOrderForm from "../TaxiOrderForm";
import { regex } from "../../utils/regex";
import {
  ETaxiForm,
  ITaxiCoordinates,
  ITaxiFormAdressData,
} from "../../types/taxi";
import Backdrop from "../Backdrop";
import { useAppActions } from "../../hooks/useAppActions";

interface ITaxiFormData {
  phone: string;
  adress_from: ITaxiFormAdressData;
  adress_where: ITaxiFormAdressData;
}

const coordinatesTmp = {
  latitude: 0,
  longitude: 0,
};

const MapPickerCoordinates = {
  lat: 0,
  lng: 0,
};

const TaxiOrderCreate: React.FC = () => {
  const { createTaxi } = useAppActions();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  const [activeMap, setActiveMap] = useState("" as ETaxiForm);
  const [mapLocation, setMapLocation] =
    useState<ITaxiCoordinates>(coordinatesTmp);
  const [mapLocationAdress, setMapLocationAdress] = useState("");
  const [defaultMapLocation, setDefaultMapLocation] =
    useState(MapPickerCoordinates);
  const [locationFrom, setLocationFrom] = useState(coordinatesTmp);
  const [locationWhere, setLocationWhere] = useState(coordinatesTmp);
  const [isFormSend, setIsFormSend] = useState(false);

  useEffect(() => {
    if (isMapOpen && isLocationSelected) {
      setAdressData(activeMap as ETaxiForm);
    }
  }, [isLocationSelected]);

  const methods = useForm<ITaxiFormData>();
  const {
    setValue: setFormValue,
    getValues: getFormValue,
    reset: resetForm,
  } = methods;

  const setAdressData = (adress: ETaxiForm) => {
    if (adress === ETaxiForm.ADRESS_FROM) {
      setLocationFrom(mapLocation);
    }
    if (adress === ETaxiForm.ADRESS_WHERE) {
      setLocationWhere(mapLocation);
    }
    setIsLocationSelected(false);
    setIsMapOpen(false);
    setFormValue(`${adress}.adress`, mapLocationAdress);
  };

  const handleChangeLocation = (
    coordinate: ITaxiCoordinates,
    locationAdress: string
  ) => {
    setMapLocation(coordinate);
    setMapLocationAdress(locationAdress);
    setIsLocationSelected(true);
  };

  const handleClickedAdressInput = (clickedAdress: ETaxiForm) => {
    const locationFromData = {
      lat: locationFrom.latitude,
      lng: locationFrom.longitude,
    };
    const locationWhereData = {
      lat: locationWhere.latitude,
      lng: locationWhere.longitude,
    };
    if (clickedAdress === ETaxiForm.ADRESS_FROM) {
      setDefaultMapLocation(locationFromData);
      setFormValue(`${ETaxiForm.ADRESS_WHERE}.adress`, "");
      setLocationWhere(coordinatesTmp);
    }
    if (
      clickedAdress === ETaxiForm.ADRESS_WHERE &&
      activeMap === ETaxiForm.ADRESS_FROM
    ) {
      setDefaultMapLocation(locationFromData);
    } else if (clickedAdress === ETaxiForm.ADRESS_WHERE) {
      setDefaultMapLocation(locationWhereData);
    }
    setIsMapOpen(true);
    setActiveMap(clickedAdress);
  };

  const onSubmit = () => {
    const phone = getFormValue("phone");
    const adressFrom = {
      ...locationFrom,
      description: getFormValue(`${ETaxiForm.ADRESS_FROM}.description`),
    };
    const adressWhere = {
      ...locationWhere,
      description: getFormValue(`${ETaxiForm.ADRESS_WHERE}.description`),
    };
    createTaxi({
      phone,
      adress_from: adressFrom,
      adress_where: adressWhere,
    });
    setIsFormSend(true);
    setTimeout(() => setIsFormSend(false), 2000);
    resetForm();
  };

  return (
    <>
      <div className={styles.createOrder}>
        <h1>Вызвать такси</h1>
        <FormProvider {...methods}>
          <form
            className={styles.createOrder__form}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <input
              type="tel"
              placeholder="Телефон"
              {...methods.register("phone", {
                required: true,
                pattern: regex.phone,
              })}
            />
            <span className="error">
              {methods.formState.errors?.phone && "Неправильный номер"}
            </span>
            <TaxiOrderForm
              name={ETaxiForm.ADRESS_FROM}
              placeholder="Откуда"
              onClickedAdressInput={() =>
                handleClickedAdressInput(ETaxiForm.ADRESS_FROM)
              }
            />
            <TaxiOrderForm
              name={ETaxiForm.ADRESS_WHERE}
              placeholder="Куда"
              onClickedAdressInput={() =>
                handleClickedAdressInput(ETaxiForm.ADRESS_WHERE)
              }
            />
            {isFormSend && <h1>Ваш заказ создан!</h1>}
            <Button type="submit" variant="success">
              Отправить заявку
            </Button>
          </form>
        </FormProvider>
      </div>
      {isMapOpen && (
        <Backdrop>
          <div className={styles.mapModal}>
            <Map
              width={800}
              height={600}
              onChangeLocation={(coordinate, locationAdress) =>
                handleChangeLocation(coordinate, locationAdress)
              }
              location={defaultMapLocation}
            />
          </div>
        </Backdrop>
      )}
    </>
  );
};

export default TaxiOrderCreate;
