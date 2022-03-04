import { FormActionTypes, FormState } from "../../types/form";
import { ITaxiInfo } from "../../types/taxi";

export function setFormData(
  option: keyof FormState,
  value: ITaxiInfo | string | number
) {
  return {
    type: FormActionTypes.SET_FORM_DATA,
    payload: {
      option,
      value,
    },
  };
}
