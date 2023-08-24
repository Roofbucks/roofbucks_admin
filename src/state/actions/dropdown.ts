import {
  reduxDropdownAction,
  DropdownState,
  dropdownActions,
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
