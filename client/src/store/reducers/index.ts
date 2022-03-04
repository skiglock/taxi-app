import { combineReducers } from "redux";
import { formReducer } from "./form.reducer";
import { taxiReducer } from "./taxi.reducer";

export const rootReducer = combineReducers({
  taxi: taxiReducer,
  form: formReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
