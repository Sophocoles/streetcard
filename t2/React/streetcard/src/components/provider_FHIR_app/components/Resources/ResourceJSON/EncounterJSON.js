// EncounterJSON.js
import React, { useState } from "react";
import "./EncounterJSON.css";

const EncounterJSON = ({ encounters }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="EncounterJSON">
      {encounters.map((encounter, index) => {
        const startDate = encounter.period?.start
          ? new Date(encounter.period.start).toLocaleDateString()
          : "Unknown";
        const status = encounter.status
          ? encounter.status.charAt(0).toUpperCase() + encounter.status.slice(1)
          : "Unknown";

        return (
          <div key={`encounter-${index}`} className="encounter">
            <div
              className="encounter-summary"
              onClick={() => handleExpand(index)}
            >
              {`Encounter #${index + 1}: Date: ${startDate} Status: ${status}`}
            </div>
            {expandedIndex === index && (
              <pre className="encounter-details">
                {JSON.stringify(encounter, null, 2)}
              </pre>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default EncounterJSON;
