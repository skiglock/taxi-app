import { combineReducers } from "redux";
import { taxiReducer } from "./taxi.reducer";

export const rootReducer = combineReducers({
  taxi: taxiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
