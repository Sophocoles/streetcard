import React, { useContext } from "react";
import ResourceContext from "../ResourceContext";
import JsonTable from "ts-react-json-table";
import '../Table.css'

export default function EncResources() {
  const resourceContext = useContext(ResourceContext);
  const data = resourceContext.resources || [];

  const encountersObj = data.find((item) => item.key === "Encounters");
  const encounters = encountersObj ? encountersObj.value : [];

  // Get all unique keys in the encounters data
  const allKeys = new Set();
  encounters.forEach((Encounter) => {
    Object.keys(Encounter).forEach((key) => {
      allKeys.add(key);
    });
  });

  // Ensure each Encounter object has all keys, even if the value is empty
  const normalizedEncounters = encounters.map((Encounter) => {
    const normalizedEncounter = { ...Encounter };
    allKeys.forEach((key) => {
      if (!normalizedEncounter.hasOwnProperty(key)) {
        normalizedEncounter[key] = "";
      }
    });
    return normalizedEncounter;
  });

  return (
    <div>
      <h2>Appt Resources</h2>
      <JsonTable rows={normalizedEncounters} />
    </div>
  );
}
