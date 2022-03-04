import { ITaxiInfo } from "./taxi";

export interface FormState {
  [key: string]: string | ITaxiInfo;
  phone: string;
  adress_from: ITaxiInfo;
  adress_where: ITaxiInfo;
}

export enum EFormTypes {
  ADRESS_FROM = "adress_from",
  ADRESS_WHERE = "adress_where",
}

export enum FormActionTypes {
  SET_FORM_DATA = "SET_FORM_DATA",
}

export interface SetFormDataAction {
  type: FormActionTypes.SET_FORM_DATA;
  payload: {
    option: keyof FormState;
    value: ITaxiInfo | string | number;
  };
}

export type FormAction = SetFormDataAction;
