import { FormAction, FormActionTypes, FormState } from "../../types/form";

const defaultAdressTemplate = {
  latitude: 0,
  longitude: 0,
  description: "",
};

const initialState: FormState = {
  phone: "",
  adress_from: defaultAdressTemplate,
  adress_where: defaultAdressTemplate,
};

export const formReducer = (state = initialState, action: FormAction) => {
  switch (action.type) {
    case FormActionTypes.SET_FORM_DATA:
      return {
        ...state,
        [action.payload.option]: action.payload.value,
      };

    default:
      return state;
  }
};
