import React, { useContext, useState, useEffect } from "react";
import { FhirClientContext } from "./FhirClientContext";
import { useNavigate } from "react-router-dom";
import ResourceContext from "../helpers/ResourceContext";

export default function GetPatientData() {
  const { client } = React.useContext(FhirClientContext);
  const { setResources } = useContext(ResourceContext);
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (status === "") {
      fetchResources();
    }
  }, []); // Pass an empty dependency array to call `fetchResources` only on the initial render

  const fetchResources = () => {
    setStatus("Loading...");
    const headers = {
      Accept: "application/fhir+json",
    };

    const startDate = new Date(2023, 2, 12);
    const endDate = new Date(2023, 5, 12);

    const apptQueryParams = `patient=${client.getPatientId()}&date=ge${startDate.toISOString()}&date=le${endDate.toISOString()}`;
    const encounterQueryParams = `patient=${client.getPatientId()}&date=ge${startDate.toISOString()}&date=le${endDate.toISOString()}`;
    const observationQueryParams = `patient=${client.getPatientId()}&date=ge${startDate.toISOString()}&date=le${endDate.toISOString()}`;

    Promise.all([
      client.request(`Appointment?${apptQueryParams}`, { headers }),
      client.request(`Encounter?${encounterQueryParams}`, { headers }),
      client.request(`Observation?${observationQueryParams}`, { headers }),
    ])
      .then(([appointmentData, encounterData, observationData]) => {
        setResources([
          { key: "Appointments", value: appointmentData.entry?.map((e) => e.resource) || [] },
          { key: "Encounters", value: encounterData.entry?.map((e) => e.resource) || [] },
          { key: "Observations", value: observationData.entry?.map((e) => e.resource) || [] },
        ]);

        console.log("Fetched resources: ", appointmentData, encounterData, observationData); // print fetched resources to console
        
        setStatus("Data fetched successfully");
      })
      .catch((error) => {
        console.error(error);
        setStatus("Error fetching data");
      });
  };

  const goToResources = (path) => {
    navigate(path);
  };

  return (
    <div>
      <button onClick={fetchResources}>Fetch Resources</button>
      <span>{status}</span>
      {status === "Data fetched successfully" && (
        <p>Error: Patient and endpoint information not found.</p>
      )}
    </div>
  );
}
