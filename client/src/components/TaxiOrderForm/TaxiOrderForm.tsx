import React, { useState } from "react";
import styles from "./taxiorderform.module.scss";
import { useFormContext } from "react-hook-form";
import { EFormTypes } from "../../types/form";

interface TaxiOrderForm {
  name: EFormTypes;
  placeholder: string;
  onClickedAdressInput: () => void;
}

const TaxiOrderForm: React.FC<TaxiOrderForm> = (props) => {
  const { name, placeholder, onClickedAdressInput } = props;
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext();

  return (
    <div className={styles.inputsGroup}>
      <input
        className={styles.adress}
        readOnly
        placeholder={placeholder}
        onClick={onClickedAdressInput}
        {...register(`${name}.adress`, { required: true })}
      />
      <span className="error">
        {errors[name]?.adress &&
          !getValues(`${name}.adress`) &&
          "Выберите адрес"}
      </span>
      <textarea
        {...register(`${name}.description`, {
          required: true,
          min: 5,
        })}
        placeholder="Комментарий"
      />
      <span className="error">
        {errors[name]?.description && "Комментарий мин 5 символов"}
      </span>
    </div>
  );
};

export default TaxiOrderForm;
