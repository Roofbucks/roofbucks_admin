/**
 * User State
 */
export interface UserState {
  firstName: string;
  lastName: string;
  role: "Member" | "Administrator";
}

export type userActions = "UPDATE_USER";

export interface reduxUserAction {
  type: userActions;
  payload: any;
}
