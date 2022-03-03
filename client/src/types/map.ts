export interface MapState {
  open: boolean;
  coordinates: IMapCoordinates;
}

export enum MapActionTypes {
  TOOGLE_MAP = "TOOGLE_MAP",
  COORDINATES_MAP = "COORDINATES_MAP",
}

export interface ToogleMapAction {
  type: MapActionTypes.TOOGLE_MAP;
}

export interface CoordinatesMapAction {
  type: MapActionTypes.COORDINATES_MAP;
  payload: IMapCoordinates;
}

export interface IMapCoordinates {
  latitude: number;
  longitude: number;
  adress: string;
}

export type MapAction = ToogleMapAction | CoordinatesMapAction;
