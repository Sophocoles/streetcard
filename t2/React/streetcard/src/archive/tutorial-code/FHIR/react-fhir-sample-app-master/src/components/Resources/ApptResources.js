import React, { useContext } from "react";
import ResourceContext from "../ResourceContext";
import JsonTable from "ts-react-json-table";
import '../Table.css'

export default function ApptResources() {
  const resourceContext = useContext(ResourceContext);
  const data = resourceContext.resources || [];

  const appointmentsObj = data.find((item) => item.key === "Appointments");
  const appointments = appointmentsObj ? appointmentsObj.value : [];

  // Get all unique keys in the appointments data
  const allKeys = new Set();
  appointments.forEach((appointment) => {
    Object.keys(appointment).forEach((key) => {
      allKeys.add(key);
    });
  });

  // Ensure each appointment object has all keys, even if the value is empty
  const normalizedAppointments = appointments.map((appointment) => {
    const normalizedAppointment = { ...appointment };
    allKeys.forEach((key) => {
      if (!normalizedAppointment.hasOwnProperty(key)) {
        normalizedAppointment[key] = "";
      }
    });
    return normalizedAppointment;
  });

  return (
    <div>
      <h2>Appt Resources</h2>
      <JsonTable rows={normalizedAppointments} />
    </div>
  );
}
