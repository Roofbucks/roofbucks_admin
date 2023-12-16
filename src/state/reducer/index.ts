import { CombinedState, combineReducers } from "redux";
import {
  dropdownActions,
  DropdownState,
  userActions,
  UserState,
} from "state/types";
import { dropdownReducer } from "./dropdown";
import { userReducer } from "./user";

const allReducers = combineReducers({
  dropdown: dropdownReducer,
  user: userReducer,
});

export type RootReducerState =
  | CombinedState<{
      dropdown: DropdownState;
      user: UserState;
    }>
  | undefined;

export type RootReducerAction =
  | CombinedState<{
      dropdown: dropdownActions;
      user: userActions;
    }>
  | any;

const rootReducer = (state: RootReducerState, action: RootReducerAction) => {
  if (action.type === "RESET_APP") {
    state = undefined;
  }
  return allReducers(state, action);
};

export default rootReducer;
