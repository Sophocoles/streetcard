import React from 'react';
import { FhirClientContext } from '../fhir/FhirClientContext';

class PatientData extends React.Component {
  static contextType = FhirClientContext;

  state = {
    data: null,
    error: null,
  };

  loadData = async () => {
    const client = this.context.client;

    const q = new URLSearchParams();
    q.set('code', 'http://loinc.org|55284-4');
    q.set('subject', client.getPatientId() || this.context.patientId);

    try {
      const response = await client.request(`Observation?${q}`);
      this.setState({ data: response, error: null });
    } catch (error) {
      this.setState({ data: null, error: error.message });
    }
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { data, error } = this.state;

    return (
      <div>
        <h1>Hi, you have been authenticated</h1>
        {data ? (
          <div>
            <h2>Data:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        ) : (
          error && (
            <div>
              <h2>Error:</h2>
              <p>{error}</p>
            </div>
          )
        )}
      </div>
    );
  }
}

export default PatientData;
