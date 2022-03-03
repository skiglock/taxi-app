import { IMapCoordinates, MapActionTypes } from "../../types/map";

export function toogleMap() {
  return {
    type: MapActionTypes.TOOGLE_MAP,
  };
}

export function coordinatesMap(coordinates: IMapCoordinates) {
  return {
    type: MapActionTypes.COORDINATES_MAP,
    payload: coordinates,
  };
}
