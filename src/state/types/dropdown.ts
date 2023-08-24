/**
 * Dropdown State
 */
export interface DropdownState {
  show: boolean;
}

export type dropdownActions = "DROPDOWN";

export interface reduxDropdownAction {
  type: dropdownActions;
  payload: any;
}