import { UserState, reduxUserAction } from "state/types";

const initialState: UserState = {
  firstName: "",
  lastName: "",
  role: "member",
};

const userReducer = (state = initialState, action: reduxUserAction) => {
  switch (action.type) {
    case "UPDATE_USER":
      return action?.payload;
    default:
      return state;
  }
};

export { userReducer };
