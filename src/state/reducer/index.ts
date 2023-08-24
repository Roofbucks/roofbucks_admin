import { CombinedState, combineReducers } from "redux";
import { dropdownActions, DropdownState } from "state/types";
import { dropdownReducer } from "./dropdown";

const allReducers = combineReducers({
  dropdown: dropdownReducer,
});

export type RootReducerState =
  | CombinedState<{
      dropdown: DropdownState;
    }>
  | undefined;

export type RootReducerAction =
  | CombinedState<{
      dropdown: dropdownActions;
    }>
  | any;

const rootReducer = (state: RootReducerState, action: RootReducerAction) => {
  if (action.type === "RESET_APP") {
    state = undefined;
  }
  return allReducers(state, action);
};

export default rootReducer;
