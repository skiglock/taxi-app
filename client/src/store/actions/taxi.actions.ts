import { Dispatch } from "redux";
import { taxiAPI } from "../../api/taxi";
import {
  ITaxi,
  ITaxiPost,
  ITaxiStatus,
  TaxiAction,
  TaxiActionTypes,
} from "../../types/taxi";

export const fetchTaxi = (
  offset: number,
  limit: number,
  status: string,
  created_at: string
) => {
  return async (dispatch: Dispatch<TaxiAction>) => {
    try {
      dispatch({ type: TaxiActionTypes.FETCH_TAXI });
      const data = await taxiAPI.getTaxi(offset, limit, status, created_at);
      dispatch({
        type: TaxiActionTypes.FETCH_TAXI_SUCCESS,
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

export const createTaxi = (taxi: ITaxiPost) => {
  return async (dispatch: Dispatch<TaxiAction>) => {
    console.log(taxi);
    try {
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

export const updateTaxi = (id: string, status: ITaxiStatus) => {
  return async (dispatch: Dispatch<TaxiAction>) => {
    try {
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
