/**
 * User State
 */
export interface UserState {
  firstName: string;
  lastName: string;
  role: "member" | "administrator";
}

export type userActions = "UPDATE_USER";

export interface reduxUserAction {
  type: userActions;
  payload: any;
}
