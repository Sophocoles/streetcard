import React, { useState, useEffect } from "react";
import { FhirClientContext } from "../FhirClientContext";

export default function PatientResourceTable() {
  const { client } = React.useContext(FhirClientContext);
  const [resources, setResources] = useState({});

  useEffect(() => {
    const headers = {
      Accept: "application/fhir+json"
    };

    client
      .request(`Patient/${client.getPatientId()}/$everything`, { headers })
      .then((data) => {
        console.log(data.headers.get("content-type")); // Log the response format
        const includedResources = data?.entry?.map((entry) => entry.resource);
        const resourceCounts = {};
        includedResources.forEach((resource) => {
          const resourceType = resource.resourceType;
          if (!resourceCounts[resourceType]) {
            resourceCounts[resourceType] = 1;
          } else {
            resourceCounts[resourceType]++;
          }
        });
        setResources(resourceCounts);
      })
      .catch((error) => {
        console.error(error, "Inside error");
      });
  }, [client]);

  return (
    <div>
      <h2>Patient Resources</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(resources).map((resourceType) => (
            <tr key={resourceType}>
              <td>{resourceType}</td>
              <td>{resources[resourceType]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
