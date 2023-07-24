import React from "react";

const context = {
  client: null,
  setClient: function(client) {
    console.log("Setting client...");
    context.client = client;
  },
  patientId: null,
  setPatientId: function(patientId) {
    console.log("Setting patient ID...");
    context.patientId = patientId;
  },
};

export const FhirClientContext = React.createContext(context);
