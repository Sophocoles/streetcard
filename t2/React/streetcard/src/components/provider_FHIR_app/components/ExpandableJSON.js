import React, { useState } from "react";
import "./ExpandableJSON.css";

const ExpandableJSON = ({ data, startDepth = 0 }) => {
  const [expandedKeys, setExpandedKeys] = useState({});

  const handleExpand = (key) => {
    setExpandedKeys((prevState) => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  const renderKeys = (obj, parentKey = "", depth = 0) => {
    if (depth < startDepth) {
      return renderKeys(obj, parentKey, depth + 1);
    }

    return Object.keys(obj).map((key) => {
      const currentKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === "object") {
        return (
          <li key={currentKey}>
            <div className="key" onClick={() => handleExpand(currentKey)}>
              {key}
            </div>
            {expandedKeys[currentKey] && (
              <ul>
                {renderKeys(obj[key], currentKey, depth + 1)}
              </ul>
            )}
          </li>
        );
      }
      return (
        <li key={currentKey}>
          <span className="key">{key}:</span>{" "}
          <span className="value">{JSON.stringify(obj[key])}</span>
        </li>
      );
    });
  };

  return (
    <ul className="ExpandableJSON">
      {renderKeys(data)}
    </ul>
  );
};

export default ExpandableJSON;
