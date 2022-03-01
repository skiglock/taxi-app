import { TaxiAction, TaxiActionTypes, TaxiState } from "../../types/taxi";

const initialState: TaxiState = {
  orders: [],
  loading: false,
  error: null,
  offset: 1,
  limit: 6,
  filters: {
    status: "",
    sort: "",
  },
};

export const taxiReducer = (
  state = initialState,
  action: TaxiAction
): TaxiState => {
  switch (action.type) {
    case TaxiActionTypes.FETCH_TAXI:
      return { ...state, loading: true };
    case TaxiActionTypes.FETCH_TAXI_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case TaxiActionTypes.FETCH_TAXI_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TaxiActionTypes.CREATE_TAXI:
      return {
        ...state,
        loading: false,
        orders: [...state.orders, action.payload],
      };
    case TaxiActionTypes.UPDATE_TAXI:
      return {
        ...state,
        loading: false,
        orders: [...state.orders].map((order) => {
          if (order.id === action.payload.id) {
            order.status = action.payload.status;
            return order;
          } else {
            return order;
          }
        }),
      };
    case TaxiActionTypes.DELETE_TAXI:
      return {
        ...state,
        loading: false,
        orders: [...state.orders].filter(({ id }) => id !== action.payload),
      };
    case TaxiActionTypes.FILTER_TAXI:
      return {
        ...state,
      };
    default:
      return state;
  }
};
