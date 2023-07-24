//For React/Django Auth
import { combineReducers } from "redux";
import { signupReducer } from "./components/django/auth/signup/SignupReducer";
import { loginReducer } from "./components/django/auth/login/LoginReducer";
import { authReducer } from "./components/django/auth/authReducer";

const createRootReducer = history =>
  combineReducers({
    createUser: signupReducer,
    auth: loginReducer
  });

export default createRootReducer;