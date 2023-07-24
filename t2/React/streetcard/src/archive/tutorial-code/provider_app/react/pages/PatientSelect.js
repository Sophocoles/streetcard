import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/PatientSelect.css'; // Import the new CSS file

function PatientSelect() {
  const [provider, setProvider] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/provider/patients/', {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`, // Assuming you have stored the token in local storage
          },
        });
        setProvider(response.data);
      } catch (error) {
        console.error('Error fetching provider data:', error);
      }
    };

    fetchProviderData();
  }, []);

  const handlePatientClick = (patientId) => {
    navigate(`/patientOverview/${patientId}`);
  };

  return (
    <div className="landing-page">
      {provider ? (
        <>
          <div className="header">Welcome {provider.name}</div> {/* Update the className */}
          <ul>
            {provider.patients.map((patient) => (
              <li key={patient.id} onClick={() => handlePatientClick(patient.id)}>
                {patient.fname} {patient.lname}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default PatientSelect;
