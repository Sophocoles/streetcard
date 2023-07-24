import React from 'react';

function VisitHistory() {
  // Replace the sample data with data fetched from the API when it's ready
  const visitDates = ['2023-01-15', '2023-02-01', '2023-03-10'];

  return (
    <div className="visitHistory">
      <h3>Visit History</h3>
      <ul>
        {visitDates.map((date, index) => (
          <li key={index}>{date}</li>
        ))}
      </ul>
    </div>
  );
}

export default VisitHistory;
