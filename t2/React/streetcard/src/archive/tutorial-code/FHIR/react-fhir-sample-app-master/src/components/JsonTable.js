import React from "react";

const JsonTable = ({ data }) => {
  // Find unique keys (column names) from the data array
  const keys = Array.from(
    new Set(data.flatMap((obj) => Object.keys(obj)))
  ).sort();

  return (
    <table>
      <thead>
        <tr>
          {keys.map((key, index) => (
            <th key={index}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((obj, rowIndex) => (
          <tr key={rowIndex}>
            {keys.map((key, cellIndex) => (
              <td key={cellIndex}>{obj[key] || ""}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JsonTable;
