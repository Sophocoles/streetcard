import axios from "axios";
import { toast } from "react-toastify";
import { SET_TOKEN, SET_CURRENT_USER, UNSET_CURRENT_USER } from "./LoginTypes";
import { setAxiosAuthToken, toastOnError } from "../utils/Utils";


export const login = (userData, redirectTo, navigate) => dispatch => {
  axios
    .post("http://127.0.0.1:8000/accounts/api/v1/token/login/", userData)
    .then(response => {
    const { access: accessToken } = response.data;
      console.log(accessToken, "<---AccessToken");
      console.log("Response data:", response.data);
      setAxiosAuthToken(accessToken);
      dispatch(setToken(accessToken));
      dispatch(getCurrentUser(redirectTo, navigate));
    })
    .catch(error => {
      dispatch(unsetCurrentUser());
      if (error.response) {
        console.log('Error response data:', error.response.data);
        toastOnError(error);
      } else {
        console.error('Error:', error.message);
        toast.error('An error occurred. Please try again later.');
      }
    });
};

export const getCurrentUser = (redirectTo, navigate) => dispatch => {
    const token = localStorage.getItem("token");
    console.log("GetCurrentUser token: ", token)
    if (!token) {
      dispatch(unsetCurrentUser());
      toast.error('No token found. Please login again.');
      return;
    }
    
    // Set the token in Axios headers
    setAxiosAuthToken(token);
  
    axios
      .get("http://127.0.0.1:8000/accounts/api/v1/users/me/")
      .then(response => {
        console.log(response.data, "Response");
        const user = {
          username: response.data.username,
          email: response.data.email,
          userData: response.data
        };
        dispatch(setCurrentUser(user, redirectTo, navigate));
      })
      .catch(error => {
        dispatch(unsetCurrentUser());
        if (error.response) {
          console.error('Error response data:', error.response.data);
          toastOnError(error);
        } else {
          console.error('Error:', error.message);
          toast.error('An error occurred. Please try again later.');
        }
      });
  };
  
  

  export const setCurrentUser = (user, redirectTo, navigate) => dispatch => {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({
      type: SET_CURRENT_USER,
      payload: user
    });

    console.log("Redirectto: ", redirectTo, "User: ", user.userData.user_type);
  //Redirect to different pages upon login
    if (redirectTo !== "") {
      if (user.userData.user_type === "provider") {
        navigate("/providerPatients");
      } else {
        navigate(redirectTo);
      }
    }
};
  

export const setToken = token => dispatch => {
  setAxiosAuthToken(token);
  localStorage.setItem("token", token);
  dispatch({
    type: SET_TOKEN,
    payload: token
  });
};

export const unsetCurrentUser = () => dispatch => {
  setAxiosAuthToken("");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("patient");
  sessionStorage.clear();
  dispatch({
    type: UNSET_CURRENT_USER
  });
};

export const logout = navigate => dispatch => {
  axios
    .post("http://127.0.0.1:8000/accounts/api/v1/token/logout/")
    .then(response => {
      dispatch(unsetCurrentUser());
      navigate("/");
      toast.success("Logout successful.");
    })
    .catch(error => {
      dispatch(unsetCurrentUser());
     // toastOnError(error);
    });
};


  
