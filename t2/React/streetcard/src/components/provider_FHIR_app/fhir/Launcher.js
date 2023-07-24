import React from "react";
import { oauth2 as SMART } from "fhirclient";
import { FhirClientContext } from "./FhirClientContext";
import PatientData from "../pages/PatientData";
import Patient from "../components/Patient";
import FhirClientProvider from "./FhirClientProvider";

class Launcher extends React.Component {
  static contextType = FhirClientContext;

  constructor(props) {
    super(props);
    this.state = {
      client: null,
      error: null,
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("SMART_KEY")) {
      this.setState({ isAuthenticated: true });
    } else {
      this.setState({ error: "No SMART_KEY found in session storage" });
    }
  }

  handleAuth = () => {
    const { patientData } = this.props;
    const { clientId, scope, redirectUri, endpoint } = patientData;

    SMART.authorize({
      clientId: clientId,
      scope: scope,
      redirectUri: redirectUri,
      iss: endpoint,
    })
      .then((client) => this.setState({ client }))
      .catch((error) => this.setState({ error }))
      .console.log("After SMART auth");
  };

  render() {
    const { patientData } = this.props;
    const { patientId, endpoint } = patientData;
    const { client, error, isAuthenticated } = this.state;

    return (
      <div>
        <h1>Launcher</h1>
        <p>Patient ID: {patientId}</p>
        <p>Endpoint URL: {endpoint}</p>
        {isAuthenticated ? (
          <div>
            <FhirClientProvider>
                <Patient />
            </FhirClientProvider>
           
            <p>Authenticated</p>
          </div>
        ) : (
          <button onClick={this.handleAuth}>Authorize</button>
        )}
        {error && <p>Error: {error}</p>}
      </div>
    );
  }
}

export default Launcher;
