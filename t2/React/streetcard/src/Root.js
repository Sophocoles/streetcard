//For React/Django Auth
import React from "react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";

import rootReducer from "./Reducer";
import { setCurrentUser, setToken } from "./components/django/auth/login/LoginActions";
import { isEmpty } from "./components/django/auth/utils/Utils";

const Root = ({ children, initialState = {} }) => {
  const middleware = [thunk];

  const store = createStore(
    rootReducer(),
    initialState,
    applyMiddleware(...middleware)
  );


  if (!isEmpty(localStorage.getItem("token"))) {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);
    store.dispatch(setToken(token));
  }
  
  if (!isEmpty(localStorage.getItem("user"))) {
    const userString = localStorage.getItem("user");
    console.log("User string from localStorage:", userString);
  
    if (userString !== "undefined") {
      try {
        const user = JSON.parse(userString);
        store.dispatch(setCurrentUser(user, ""));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }
  



  /*
  if (!isEmpty(localStorage.getItem("token"))) {
    store.dispatch(setToken(localStorage.getItem("token")));
  }
  if (!isEmpty(localStorage.getItem("user"))) {
    const userString = localStorage.getItem("user");
    console.log("User string from localStorage:", userString); // Add this line to log the value
    const user = JSON.parse(userString);
    store.dispatch(setCurrentUser(user, ""));
  }
  */

  return (
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  );
};

export default Root;