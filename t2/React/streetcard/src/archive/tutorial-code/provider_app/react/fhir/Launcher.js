import React, { useState, useEffect } from "react";
import { oauth2 as SMART } from "fhirclient";

async function fetchPatientAndEndpoints(patientId) {
    const response = await fetch(`http://127.0.0.1:8000/api/patient_and_endpoints/${patientId}/`);
  
    if (response.ok) {
      if (response.headers.get("content-type").includes("application/json")) {
        const data = await response.json();
        console.log('fetchPatientAndEndpoints data:', data);
        return data;
      } else {
        console.error('Unexpected content type:', response.headers.get("content-type"));
        const text = await response.text();
        console.error('Raw response text:', text);
        throw new Error('Unexpected content type');
      }
    } else {
      console.error('Error fetching patient and endpoints:', response.status, response.statusText);
      throw new Error('Error fetching patient and endpoints');
    }
  }
  
  
  

function Launcher({ patientId }) {

      // Function to make an API call when the selected endpoint is clicked
  async function handleEndpointClick(endpoint) {
    setSelectedEndpoint(endpoint);

    // Pseudo-code for API call
    console.log("You clicked ", endpoint)

    const options = {

        clientId: endpoint.client_id,
        scope: endpoint.scope,
        redirectUri: endpoint.redirect_uri,
        iss: endpoint.url
    }

    SMART.authorize(options);


  }

  console.log('patientId:', patientId);
  const [patientAndEndpoints, setPatientAndEndpoints] = useState(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);

  useEffect(() => {
    if (patientId) {
      fetchPatientAndEndpoints(patientId).then(data => {
        console.log('patientAndEndpoints fetched data:', data);
        setPatientAndEndpoints(data);
      });
    }
  }, [patientId]);
  

  

 //insert logic for getting provider ino here



  if (!patientAndEndpoints) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Patient Name: {patientAndEndpoints.patient.fname} {patientAndEndpoints.patient.lname}</h3>
      <h4>Associated Endpoints:</h4>
      <ul>
        {patientAndEndpoints.endpoints.map(endpoint => (
          <li key={endpoint.id} onClick={() => handleEndpointClick(endpoint)}>
            {endpoint.url}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Launcher;
