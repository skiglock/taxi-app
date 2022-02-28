interface ITaxiInfo {
  latitude: number;
  longitude: number;
  description: string;
}

export type ITaxiStatus = "NEW" | "CANCELED";

export interface ITaxiPost {
  phone: string;
  adress_from: ITaxiInfo;
  adress_where: ITaxiInfo;
}

export interface ITaxi extends ITaxiPost {
  id: string;
  created_at: string;
  status: ITaxiStatus;
}

export interface TaxiState {
  orders: ITaxi[];
  loading: boolean | null;
  error: string | null;
  offset: number;
  limit: number;
  created_at: "ASC" | "DESC" | "";
  status: string;
}

export enum TaxiActionTypes {
  FETCH_TAXI = "FETCH_TAXI",
  FETCH_TAXI_SUCCESS = "FETCH_TAXI_SUCCESS",
  FETCH_TAXI_ERROR = "FETCH_TAXI_ERROR",
  CREATE_TAXI = "CREATE_TAXI",
  UPDATE_TAXI = "UPDATE_TAXI",
  DELETE_TAXI = "DELETE_TAXI",
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

export type TaxiAction =
  | FetchTaxiAction
  | FetchTaxiSuccessAction
  | FetchTaxiErrorAction
  | CreateTaxiAction
  | UpdateTaxiAction
  | DeleteTaxiAction;
