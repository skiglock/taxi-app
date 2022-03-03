import { MapAction, MapActionTypes, MapState } from "../../types/map";

const initialState: MapState = {
  open: false,
  coordinates: {
    latitude: 0,
    longitude: 0,
    adress: "",
  },
};

export const mapReducer = (state = initialState, action: MapAction) => {
  switch (action.type) {
    case MapActionTypes.TOOGLE_MAP:
      return { ...state, open: !state.open };
    case MapActionTypes.COORDINATES_MAP:
      return { ...state, coordinates: action.payload, open: false };
    default:
      return state;
  }
};
