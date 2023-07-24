import React from "react";
import { FhirClientContext } from "../../fhir/FhirClientContext";

async function fetchAllEncounters(client, patientId, status, count, url = null) {
  const requestUrl = url || `Encounter?patient=${patientId}&status=${status}&_count=${count}`;
  const encounterResponse = await client.request(requestUrl);
  const encounters = encounterResponse.entry.map(entry => entry.resource);

  const nextPageUrl = encounterResponse.link.find(link => link.relation === "next")?.url;

  if (nextPageUrl) {
    const nextPageEncounters = await fetchAllEncounters(client, patientId, status, count, nextPageUrl);
    encounters.push(...nextPageEncounters);
  }

  return encounters;
}

export async function fetchPatientEncounter(client, patientId, count = 10, status = 'finished') {
  try {
    const encounters = await fetchAllEncounters(client, patientId, status, count);

    // Sort encounters by date in descending order
    encounters.sort((a, b) => {
      const dateA = new Date(a.period?.start || 0);
      const dateB = new Date(b.period?.start || 0);
      return dateB - dateA;
    });

    // Return the specified number of most recent encounters (default 10)
    return encounters.slice(0, count);
  } catch (error) {
    throw error;
  }
}
