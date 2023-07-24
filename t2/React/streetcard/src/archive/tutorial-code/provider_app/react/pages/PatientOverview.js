import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import VisitHistory from '../components/VisitHistory';
import MedicalDetails from '../components/MedicalDetails';
import Launcher from '../fhir/Launcher';
import './css/PatientOverview.css';

function PatientOverview() {
  const [patient, setPatient] = useState(null);
  const { id: patientId } = useParams();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/patient/${patientId}/`);
        setPatient(response.data);
        console.log(response.data); // Add this line to inspect the data
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, [patientId]);

  return (
    <div className="patientOverview">
      <div className="companyLogo">Company Logo</div>
      {patient ? (
        <>
          <div className="patientInfo">
            <div className="patientDetails">
              <h2>{patient.name}</h2>
              <p>{`DOB: ${patient.dob}`}</p>
              <p>{`Address: ${patient.address}`}</p>
              <p>{`Join date: ${patient.join_date}`}</p>
            </div>
            <img
              className="patientImage"
              src={patient.image_url}
              alt={`${patient.name}'s profile`}
            />
          </div>
          <div className="visitAndMedicalDetails">
            <Launcher className="component" patientId={patientId}/>
            <div></div>
            <VisitHistory className="component" />
            <MedicalDetails className="component" />
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default PatientOverview;
