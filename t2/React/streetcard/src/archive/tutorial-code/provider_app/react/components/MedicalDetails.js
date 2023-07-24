import React from 'react';

function MedicalDetails() {
  // Replace the sample data with data fetched from the API when it's ready
  const problems = ['Asthma', 'Diabetes'];
  const allergies = ['Peanuts', 'Shellfish'];
  const medications = ['Metformin', 'Albuterol'];

  return (
    <div className="medicalDetails">
      <h3>Medical Details</h3>
      <div>
        <h4>Problems</h4>
        <ul>
          {problems.map((problem, index) => (
            <li key={index}>{problem}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Allergies</h4>
        <ul>
          {allergies.map((allergy, index) => (
            <li key={index}>{allergy}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Medications</h4>
        <ul>
          {medications.map((medication, index) => (
            <li key={index}>{medication}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MedicalDetails;
