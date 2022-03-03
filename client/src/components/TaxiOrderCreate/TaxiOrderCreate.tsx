import React from "react";
import styles from "./taxiordercreate.module.scss";
import Button from "../Button";
import Map from "../Map";
import Backdrop from "../Backdrop";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppActions } from "../../hooks/useAppActions";
import { useForm } from "react-hook-form";
import { regex } from "../../utils/regex";
import { ITaxiInfo } from "../../types/taxi";

interface OrderFormData {
  phone: string;
  adress_from: ITaxiInfo;
  adress_where: ITaxiInfo;
}

const TaxiOrderCreate: React.FC = () => {
  const { open, coordinates } = useAppSelector((state) => state.map);
  const { toogleMap, coordinatesMap } = useAppActions();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>();

  const onSubmit = (data: OrderFormData) => {
    console.log(data);
  };
  return (
    <>
      {open && (
        <Backdrop>
          <div className={styles.mapModal}>
            <Map
              onChangeLocation={(coordinates) => coordinatesMap(coordinates)}
            />
          </div>
        </Backdrop>
      )}
      <div className={styles.createOrder}>
        <h1>Вызвать такси</h1>
        <form
          className={styles.createOrder__form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            placeholder="Телефон"
            {...register("phone", { required: true, pattern: regex.phone })}
          />
          {errors.phone && (
            <span className={styles.error}>Телефон неверный</span>
          )}
          <input
            readOnly
            style={{ cursor: "pointer" }}
            value={coordinates.adress}
            placeholder="Куда"
            onClick={() => toogleMap()}
          />
          <input
            {...register("adress_from.latitude")}
            value={coordinates.latitude}
          />
          <input
            {...register("adress_from.longitude")}
            value={coordinates.longitude}
          />
          <textarea
            {...register("adress_from.description", {
              required: true,
              minLength: 5,
            })}
          />
          {errors.adress_from?.description && (
            <span className={styles.error}>Минимум 5 символов</span>
          )}

          <Button type="submit" variant="success">
            Отправить заявку
          </Button>
        </form>
      </div>
    </>
  );
};

export default TaxiOrderCreate;
