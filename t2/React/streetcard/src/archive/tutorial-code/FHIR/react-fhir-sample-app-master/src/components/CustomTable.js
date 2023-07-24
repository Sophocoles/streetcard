import React from "react";

function CustomTable({ data }) {
  const dataArray = Array.isArray(data) ? data : [data]; // Convert non-array data input into an array

  function renderValue(value) {
    if (Array.isArray(value)) {
      return (
        <table>
          <tbody>
            {value.map((item, index) => (
              <tr key={index}>
                <td>{renderValue(item)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (typeof value === "object") {
      if (Object.keys(value).length === 1) {
        const [key, val] = Object.entries(value)[0];
        return `${key}: ${val}`;
      }

      return <CustomTable data={value} />;
    }

    return value;
  }

  return (
    <table>
      <thead>
        <tr>
          {dataArray.length > 0 &&
            Object.keys(dataArray[0]).map((key) => <th key={key}>{key}</th>)}
        </tr>
      </thead>
      <tbody>
        {dataArray.map((item, index) => (
          <tr key={index}>
            {Object.values(item).map((value, index) => (
              <td key={index}>{renderValue(value)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CustomTable;
