import React, { useEffect, useReducer, useContext, useState } from 'react';
import axios from 'axios';
import { toastOnError } from '../../django/auth/utils/Utils';
import { toast } from 'react-toastify';
import { setAxiosAuthToken } from '../../django/auth/utils/Utils';
import { Link } from 'react-router-dom';
import { FhirClientContext } from '../fhir/FhirClientContext';

const ProviderFHIR = () => {
  const initialState = {
    patients: [],
    loading: true,
    error: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_SUCCESS':
        return {
          ...state,
          loading: false,
          patients: action.payload.patients,
        };
      case 'FETCH_ERROR':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { patientId } = useContext(FhirClientContext); // Get the patientId from the context
  const [patientData, setPatientData] = useState(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No token found. Please login again.');
      return;
    }
  
    setAxiosAuthToken(token);

    axios
      .get("http://127.0.0.1:8000/accounts/provider_patients/")
      .then(response => {
        dispatch({ type: "FETCH_SUCCESS", payload: response.data }, console.log("Response: ", response.data));
      })
      .catch(error => {
        if (error.response) {
          console.error('Error response data:', error.response.data);
          dispatch({ type: "FETCH_ERROR", payload: error.response.data });
          toastOnError(error);
        } else {
          console.error('Error:', error.message);
          dispatch({ type: "FETCH_ERROR", payload: error.message });
          toast.error('An error occurred. Please try again later.');
        }
      });
  }, []);

  const { patients, loading, error } = state;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handlePatientClick = (patient, endpoint) => {
    // Save patient data and selected endpoint to local storage
    localStorage.setItem('patient', JSON.stringify(patient));
    setSelectedEndpoint(endpoint);
    setPatientData(patient);
  }

  return (
    <div>
      <h1>Provider Patients</h1>
      <ul>
        {patients.map((patient, index) => (
          <li key={index}>
            <details>
              <summary>
                {patient.first_name} {patient.last_name} ({patient.endpoints.length} endpoints)
              </summary>
              <ul>
                {patient.endpoints.map((endpoint, endpointIndex) => (
                  <li key={endpointIndex}>
                    {endpoint.name}:{" "}
                    <Link
                      to={{
                        pathname: `/patientOverview`,
                        state: { patient, endpoint },
                      }}
                      onClick={() => handlePatientClick(patient, endpoint)}
                    >
                      {endpoint.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
                    }  

export default ProviderFHIR;
