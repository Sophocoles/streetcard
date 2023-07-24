import { SET_TOKEN, SET_CURRENT_USER, UNSET_CURRENT_USER } from "./login/LoginTypes";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  providerPatients: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case UNSET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case "SET_PROVIDER_PATIENTS":
      return {
        ...state,
        providerPatients: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
