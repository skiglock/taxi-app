import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import Actions from "../store/actions";

export const useAppActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(Actions, dispatch);
};
