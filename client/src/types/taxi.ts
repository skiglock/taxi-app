export interface ITaxiInfo {
  latitude: number;
  longitude: number;
  description: string;
}

export enum ETaxiFilters {
  RELEVANCE = "relevance",
  SORT = "sort",
}

export type ITaxiStatus = "NEW" | "CANCELED" | "";

export type ITaxiSort = "ASC" | "DESC" | "";

export enum ETaxiSorts {
  ASC = "Сначало новые",
  DESC = "Сначало старое",
}

export enum ETaxiStatuses {
  NEW = "Новый заказ",
  CANCELED = "Отмененный заказ",
}

export interface ITaxiPost {
  phone: string;
  adress_from: ITaxiInfo;
  adress_where: ITaxiInfo;
}

export interface ITaxi extends ITaxiPost {
  id: string;
  created_at: Date;
  status: ITaxiStatus;
}

export interface TaxiState {
  orders: ITaxi[];
  loading: boolean | null;
  error: string | null;
  offset: number;
  limit: number;
  filters: {
    status: ITaxiStatus;
    sort: ITaxiSort;
  };
}

export enum TaxiActionTypes {
  FETCH_TAXI = "FETCH_TAXI",
  FETCH_TAXI_SUCCESS = "FETCH_TAXI_SUCCESS",
  FETCH_TAXI_ERROR = "FETCH_TAXI_ERROR",
  CREATE_TAXI = "CREATE_TAXI",
  UPDATE_TAXI = "UPDATE_TAXI",
  DELETE_TAXI = "DELETE_TAXI",
  FILTER_TAXI = "FILTER_TAXI",
}

interface FetchTaxiAction {
  type: TaxiActionTypes.FETCH_TAXI;
}

interface FetchTaxiSuccessAction {
  type: TaxiActionTypes.FETCH_TAXI_SUCCESS;
  payload: ITaxi[];
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
  payload: { id: string; status: ITaxiStatus };
}

interface DeleteTaxiAction {
  type: TaxiActionTypes.DELETE_TAXI;
  payload: string;
}

interface FilterTaxiAction {
  type: TaxiActionTypes.FILTER_TAXI;
  payload: { filter: "status" | "sort" };
}

export type TaxiAction =
  | FetchTaxiAction
  | FetchTaxiSuccessAction
  | FetchTaxiErrorAction
  | CreateTaxiAction
  | UpdateTaxiAction
  | DeleteTaxiAction
  | FilterTaxiAction;
