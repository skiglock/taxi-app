import { Dispatch } from "redux";
import { taxiAPI } from "../../api/taxi";
import {
  ITaxiPost,
  TTaxiStatus,
  TaxiAction,
  TaxiActionTypes,
  TTaxiSort,
} from "../../types/taxi";

export const fetchTaxi = (
  page: number,
  limit: number,
  status: TTaxiStatus,
  sort: TTaxiSort
) => {
  return async (dispatch: Dispatch<TaxiAction>) => {
    try {
      dispatch({ type: TaxiActionTypes.FETCH_TAXI });
      const { data, total } = await taxiAPI.getTaxi(page, limit, status, sort);
      setTimeout(() => {
        dispatch({
          type: TaxiActionTypes.FETCH_TAXI_SUCCESS,
          payload: {
            data,
            total,
          },
        });
      }, 1200);
    } catch (e) {
      dispatch({
        type: TaxiActionTypes.FETCH_TAXI_ERROR,
        payload: `${e}`,
      });
    }
  };
};

export const createTaxi = (taxi: ITaxiPost) => {
  return async (dispatch: Dispatch<TaxiAction>) => {
    try {
      dispatch({ type: TaxiActionTypes.FETCH_TAXI });
      const data = await taxiAPI.createTaxi(taxi);
      dispatch({
        type: TaxiActionTypes.CREATE_TAXI,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: TaxiActionTypes.FETCH_TAXI_ERROR,
        payload: `${e}`,
      });
    }
  };
};

export const updateTaxi = (id: string, status: TTaxiStatus) => {
  return async (dispatch: Dispatch<TaxiAction>) => {
    try {
      dispatch({ type: TaxiActionTypes.FETCH_TAXI });
      const data = await taxiAPI.updateTaxi(id, status);
      dispatch({
        type: TaxiActionTypes.UPDATE_TAXI,
        payload: {
          id: data.id,
          status: data.status,
        },
      });
    } catch (e) {
      dispatch({
        type: TaxiActionTypes.FETCH_TAXI_ERROR,
        payload: `${e}`,
      });
    }
  };
};

export const deleteTaxi = (id: string) => {
  return async (dispatch: Dispatch<TaxiAction>) => {
    try {
      dispatch({ type: TaxiActionTypes.FETCH_TAXI });
      await taxiAPI.deleteTaxi(id);
      dispatch({
        type: TaxiActionTypes.DELETE_TAXI,
        payload: id,
      });
    } catch (e) {
      dispatch({
        type: TaxiActionTypes.FETCH_TAXI_ERROR,
        payload: `${e}`,
      });
    }
  };
};

export function setTaxiStatus(status: TTaxiStatus) {
  return {
    type: TaxiActionTypes.FILTER_STATUS_TAXI,
    payload: status,
  };
}

export function setTaxiSort(sort: TTaxiSort) {
  return {
    type: TaxiActionTypes.FILTER_SORT_TAXI,
    payload: sort,
  };
}

export function setTaxiPage() {
  return {
    type: TaxiActionTypes.PAGE_OFFSET_TAXI,
  };
}

export function setTaxiLimit(limit: number) {
  return {
    type: TaxiActionTypes.PAGE_OFFSET_TAXI,
    payload: limit,
  };
}
