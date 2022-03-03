import { combineReducers } from "redux";
import { mapReducer } from "./map.reducer";
import { taxiReducer } from "./taxi.reducer";

export const rootReducer = combineReducers({
  taxi: taxiReducer,
  map: mapReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
