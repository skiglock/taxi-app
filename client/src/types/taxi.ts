export interface ITaxiInfo {
  latitude: number;
  longitude: number;
  description: string;
}

export enum ETaxiFilters {
  STATUS = "status",
  SORT = "sort",
}

export type TTaxiStatus = "NEW" | "CANCELED" | "";

export type TTaxiSort = "ASC" | "DESC" | "";

export enum ETaxiSorts {
  ALL = "Все",
  ASC = "Сначало новые",
  DESC = "Сначало старое",
}

export enum ETaxiStatuses {
  ALL = "Все",
  NEW = "Новый заказ",
  CANCELED = "Отмененный заказ",
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
  status: TTaxiStatus;
}

export interface TaxiState {
  total: number;
  orders: ITaxi[];
  loading: boolean | null;
  error: string | null;
  page: number;
  limit: number;
  status: TTaxiStatus;
  sort: TTaxiSort;
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
  payload: { id: string; status: TTaxiStatus };
}

interface DeleteTaxiAction {
  type: TaxiActionTypes.DELETE_TAXI;
  payload: string;
}

interface FilterStatusTaxiAction {
  type: TaxiActionTypes.FILTER_STATUS_TAXI;
  payload: TTaxiStatus;
}

interface FilterSortTaxiAction {
  type: TaxiActionTypes.FILTER_SORT_TAXI;
  payload: TTaxiSort;
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
