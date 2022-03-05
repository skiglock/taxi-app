export interface ITaxiCoordinates {
  latitude: number;
  longitude: number;
}

export interface ITaxiFormAdressData extends ITaxiCoordinates {
  adress: string;
  description: string;
}

export interface ITaxiInfo extends ITaxiCoordinates {
  description: string;
}

export enum ETaxiFilters {
  STATUS = "status",
  SORT = "sort",
}

export enum ETaxiForm {
  ADRESS_FROM = "adress_from",
  ADRESS_WHERE = "adress_where",
}

export enum ETaxiFormErrors {
  required = "Введите что нибудь",
}

export enum ETaxiStatus {
  NEW = "NEW",
  CANCELED = "CANCELED",
  DEFAULT = "",
}

export enum ETaxiSort {
  ASC = "ASC",
  DESC = "DESC",
  DEFAULT = "",
}

export interface ITaxiPost {
  phone: string;
  adress_from: ITaxiInfo;
  adress_where: ITaxiInfo;
}

export interface ITaxiResponse {
  data: ITaxi[];
  total: number;
}

export interface ITaxi extends ITaxiPost {
  id: string;
  created_at: Date;
  status: ETaxiStatus;
}

export interface TaxiState {
  total: number;
  orders: ITaxi[];
  loading: boolean | null;
  error: string | null;
  page: number;
  limit: number;
  filters: ITaxiFilters;
}

export interface ITaxiFilters {
  status: ETaxiStatus;
  sort: ETaxiSort;
}

export enum TaxiActionTypes {
  FETCH_TAXI = "FETCH_TAXI",
  FETCH_TAXI_SUCCESS = "FETCH_TAXI_SUCCESS",
  FETCH_TAXI_ERROR = "FETCH_TAXI_ERROR",
  CREATE_TAXI = "CREATE_TAXI",
  UPDATE_TAXI = "UPDATE_TAXI",
  DELETE_TAXI = "DELETE_TAXI",
  FILTER_TAXI = "FILTER_TAXI",
  PAGE_LIMIT_TAXI = "PAGE_LIMIT_TAXI",
  PAGE_OFFSET_TAXI = "PAGE_OFFSET_TAXI",
}

interface FetchTaxiAction {
  type: TaxiActionTypes.FETCH_TAXI;
}

interface FetchTaxiSuccessAction {
  type: TaxiActionTypes.FETCH_TAXI_SUCCESS;
  payload: { data: ITaxi[]; total: number };
}

interface FetchTaxiErrorAction {
  type: TaxiActionTypes.FETCH_TAXI_ERROR;
  payload: string | null;
}

interface CreateTaxiAction {
  type: TaxiActionTypes.CREATE_TAXI;
  payload: ITaxi;
}

interface UpdateTaxiAction {
  type: TaxiActionTypes.UPDATE_TAXI;
  payload: { id: string; status: ETaxiStatus };
}

interface DeleteTaxiAction {
  type: TaxiActionTypes.DELETE_TAXI;
  payload: string;
}

interface FilterTaxiAction {
  type: TaxiActionTypes.FILTER_TAXI;
  payload: {
    filter: keyof ITaxiFilters;
    value: ETaxiStatus | ETaxiSort;
  };
}

interface PageOffsetTaxiction {
  type: TaxiActionTypes.PAGE_OFFSET_TAXI;
}

interface PageLimitTaxiAction {
  type: TaxiActionTypes.PAGE_LIMIT_TAXI;
  payload: number;
}

export type TaxiAction =
  | FetchTaxiAction
  | FetchTaxiSuccessAction
  | FetchTaxiErrorAction
  | CreateTaxiAction
  | UpdateTaxiAction
  | DeleteTaxiAction
  | FilterTaxiAction
  | PageLimitTaxiAction
  | PageOffsetTaxiction;
