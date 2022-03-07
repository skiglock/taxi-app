import {
  ETaxiFilters,
  ETaxiSort,
  ETaxiStatus,
  TaxiAction,
  TaxiActionTypes,
  TaxiState,
} from "../../types/taxi";

const initialState: TaxiState = {
  total: 0,
  orders: [],
  loading: false,
  error: null,
  page: 1,
  limit: 3,
  filters: {
    status: ETaxiStatus.DEFAULT,
    sort: ETaxiSort.DEFAULT,
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
        orders: [...state.orders, ...action.payload.data],
        total: action.payload.total,
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
        filters: {
          ...state.filters,
          [action.payload.filter]: action.payload.value,
        },
        orders: [],
        page: 1,
      };
    case TaxiActionTypes.PAGE_OFFSET_TAXI:
      return {
        ...state,
        page:
          state.total / state.page <= state.limit ? state.page : state.page + 1,
      };
    default:
      return state;
  }
};
