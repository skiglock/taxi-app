import React, { useEffect, useState } from "react";
import styles from "./taxiordercreate.module.scss";
import Button from "../Button";
import { FormProvider, useForm } from "react-hook-form";
import Map from "../Map";
import TaxiOrderForm from "../TaxiOrderForm";
import { EFormTypes } from "../../types/form";
import { regex } from "../../utils/regex";
import { ITaxiCoordinates, ITaxiInfo } from "../../types/taxi";
import Backdrop from "../Backdrop";
import { useAppActions } from "../../hooks/useAppActions";
import { useAppSelector } from "../../hooks/useAppSelector";

interface ITaxiFormData {
  phone: string;
  adress_from: ITaxiInfo;
  adress_where: ITaxiInfo;
}

const coordinatesTmp = {
  latitude: 0,
  longitude: 0,
};

const TaxiOrderCreate: React.FC = () => {
  const { setFormData } = useAppActions();
  const formState: ITaxiFormData = useAppSelector((state) => state.form);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  const [activeMap, setActiveMap] = useState<EFormTypes>();
  const [mapLocation, setMapLocation] =
    useState<ITaxiCoordinates>(coordinatesTmp);
  const [mapLocationAdress, setMapLocationAdress] = useState("");
  const [defaultMapLocation, setDefaultMapLocation] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    if (isMapOpen && activeMap === EFormTypes.ADRESS_FROM) {
      dispatchAdressData(EFormTypes.ADRESS_FROM);
    }
    if (isMapOpen && activeMap === EFormTypes.ADRESS_WHERE) {
      dispatchAdressData(EFormTypes.ADRESS_WHERE);
    }
  }, [isLocationSelected]);

  const methods = useForm<ITaxiFormData>();

  const dispatchAdressData = (adress: EFormTypes) => {
    const description = methods.getValues(`${adress}.description`);
    setFormData(adress, {
      ...mapLocation,
      description: description ? description : "",
    });
    setIsLocationSelected(false);
    setIsMapOpen(false);
    methods.setValue(`${adress}.adress` as any, mapLocationAdress);
  };

  const handleChangeLocation = (
    coordinate: ITaxiCoordinates,
    locationAdress: string
  ) => {
    setMapLocation(coordinate);
    setMapLocationAdress(locationAdress);
    setIsLocationSelected(true);
  };

  const handleClickedAdressInput = (adress: EFormTypes) => {
    let formStateCoordinates = {
      lat: formState[adress].latitude,
      lng: formState[adress].longitude,
    };
    if (EFormTypes.ADRESS_FROM) {
      methods.setValue(`${EFormTypes.ADRESS_WHERE}.adress` as any, "");
    }
    if (EFormTypes.ADRESS_WHERE && activeMap === EFormTypes.ADRESS_FROM) {
      formStateCoordinates = {
        lat: formState[EFormTypes.ADRESS_FROM].latitude,
        lng: formState[EFormTypes.ADRESS_FROM].longitude,
      };
    }
    setDefaultMapLocation(formStateCoordinates);
    setIsMapOpen(true);
    setActiveMap(adress);
  };

  const onSubmit = () => {
    console.log(formState);
  };

  console.log(defaultMapLocation);
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
                onChange: (e) => {
                  setFormData("phone", e.target.value);
                },
              })}
            />
            <span className="error">
              {methods.formState.errors?.phone && "Неправильный номер"}
            </span>
            <TaxiOrderForm
              name={EFormTypes.ADRESS_FROM}
              placeholder="Откуда"
              onClickedAdressInput={() =>
                handleClickedAdressInput(EFormTypes.ADRESS_FROM)
              }
            />
            <TaxiOrderForm
              name={EFormTypes.ADRESS_WHERE}
              placeholder="Куда"
              onClickedAdressInput={() =>
                handleClickedAdressInput(EFormTypes.ADRESS_WHERE)
              }
            />
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
