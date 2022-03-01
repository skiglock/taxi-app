export interface ITaxiLocation {
  latitude: number;
  longitude: number;
  adress: string;
}

export interface ITaxiInfo extends ITaxiLocation {
  description: string;
}

export enum ETaxiFilters {
  STATUS = "status",
  SORT = "sort",
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
  status: ETaxiStatus;
  sort: ETaxiSort;
}

export enum ETaxiOrderValidate {
  PHONE = "/^[+]?([0-9][s]?|[0-9]?)([(][0-9]{3}[)][s]?|[0-9]{3}[-s.]?)[0-9]{3}[-s.]?[0-9]{4,6}$/im",
  LATITUDE = "/^-?(90|[1-8][0-9][.][0-9]{1,20}|[0-9][.][0-9]{1,20})$/",
  LONGITUDE = "/^-?(180|1[1-7][0-9][.][0-9]{1,20}|[1-9][0-9][.][0-9]{1,20}|[0-9][.][0-9]{1,20})$/",
}

export enum TaxiActionTypes {
  FETCH_TAXI = "FETCH_TAXI",
  FETCH_TAXI_SUCCESS = "FETCH_TAXI_SUCCESS",
  FETCH_TAXI_ERROR = "FETCH_TAXI_ERROR",
  CREATE_TAXI = "CREATE_TAXI",
  UPDATE_TAXI = "UPDATE_TAXI",
  DELETE_TAXI = "DELETE_TAXI",
  FILTER_STATUS_TAXI = "FILTER_STATUS_TAXI",
  FILTER_SORT_TAXI = "FILTER_SORT_TAXI",
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

interface FilterStatusTaxiAction {
  type: TaxiActionTypes.FILTER_STATUS_TAXI;
  payload: ETaxiStatus;
}

interface FilterSortTaxiAction {
  type: TaxiActionTypes.FILTER_SORT_TAXI;
  payload: ETaxiSort;
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
  | FilterStatusTaxiAction
  | FilterSortTaxiAction
  | PageLimitTaxiAction
  | PageOffsetTaxiction;
