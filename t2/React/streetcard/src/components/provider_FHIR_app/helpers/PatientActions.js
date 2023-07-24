import { SET_PATIENT } from "./PatientTypes";

export const setPatient = (patient) => dispatch => {
  localStorage.setItem("patient", JSON.stringify(patient));
  dispatch({
    type: SET_PATIENT,
    payload: patient
  });
};

export const updatePatient = (patient) => dispatch => {
  const storedPatient = JSON.parse(localStorage.getItem("patient"));
  const updatedPatient = { ...storedPatient, ...patient };
  localStorage.setItem("patient", JSON.stringify(updatedPatient));
  dispatch({
    type: SET_PATIENT,
    payload: updatedPatient
  });
};

export const getPatient = () => dispatch => {
  const storedPatient = JSON.parse(localStorage.getItem("patient"));
  dispatch({
    type: SET_PATIENT,
    payload: storedPatient
  });
};
