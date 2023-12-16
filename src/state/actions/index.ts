import {
  reduxDropdownAction,
  DropdownState,
  dropdownActions,
  userActions,
  UserState,
  reduxUserAction,
} from "state/types";

export const resetStore = () => {
  return {
    type: "RESET_APP",
  };
};

export const updateDropdown = (
  action: dropdownActions,
  data: DropdownState
): reduxDropdownAction => {
  return {
    type: action,
    payload: data,
  };
};

export const updateUser = (data: UserState): reduxUserAction => {
  return {
    type: "UPDATE_USER",
    payload: data,
  };
};
