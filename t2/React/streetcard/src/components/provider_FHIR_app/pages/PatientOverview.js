import React from "react";
import Launcher from "../fhir/Launcher";
import PatientData from "./PatientData";
import FhirClientProvider from "../fhir/FhirClientProvider";


const PatientOverview = (props) => {
  const patient = JSON.parse(localStorage.getItem("patient"));
  const patientId = patient.cerner_sandbox_patientId;
  const endpoints = patient.endpoints;
  const endpoint = endpoints.find((obj) => obj.name === "cerner").url;
  const clientId = endpoints.find((obj) => obj.name === "cerner").client_id;
  const scope = endpoints.find((obj) => obj.name === "cerner").scope;
  const redirectUri = endpoints.find((obj) => obj.name === "cerner").redirect_uri;
  const patientData = { patientId, endpoint, clientId, scope, redirectUri };

  return (
    
        <div>
            <h1>Patient Overview</h1>
            {patient && endpoint ? (
                <>
                <Launcher patientData={patientData} />
                </>
            ) : (
                <p>Error: Patient and endpoint information not found.</p>
            )}
        </div>
    
  );
};

export default PatientOverview;
