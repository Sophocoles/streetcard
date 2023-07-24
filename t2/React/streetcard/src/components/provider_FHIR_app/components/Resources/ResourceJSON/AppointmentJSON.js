import React, { useState } from "react";
import "./AppointmentJSON.css";

const AppointmentJSON = ({ appointments }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="AppointmentJSON">
      {appointments.map((appointment, index) => {
        const startDate = appointment.start
          ? new Date(appointment.start).toLocaleDateString()
          : "Unknown";
        const status = appointment.status
          ? appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)
          : "Unknown";

        return (
          <div key={`appointment-${index}`} className="appointment">
            <div
              className="appointment-summary"
              onClick={() => handleExpand(index)}
            >
              {`Appointment #${index + 1}: Date: ${startDate} Status: ${status}`}
            </div>
            {expandedIndex === index && (
              <pre className="appointment-details">
                {JSON.stringify(appointment, null, 2)}
              </pre>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentJSON;
