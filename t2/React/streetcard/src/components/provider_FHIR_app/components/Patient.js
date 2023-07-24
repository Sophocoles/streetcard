import React from "react";
import { FhirClientContext } from "../fhir/FhirClientContext";
import { fetchPatientEncounter } from "./Resources/EncResources";
import ExpandableJSON from "./ExpandableJSON";
import ReactJsonPretty from 'react-json-pretty';
import jsonToTable from "json-to-table"
import EncounterJSON from "./Resources/ResourceJSON/EncounterJSON";
import AppointmentJSON from "./Resources/ResourceJSON/AppointmentJSON";
import { fetchPatientAppointment } from "./Resources/ApptResources";

function PatientName({ name = [] }) {
    let entry = name.find((nameRecord) => nameRecord.use === "official") || name[0];
    if (!entry) {
      return <h1>No Name</h1>;
    }
    return <h1>{entry.given.join(" ") + " " + entry.family}</h1>;
}

function PatientBanner(patient) {
    const address = patient.address.find((obj) => obj.use === "home").text;

    return (
        <div>
            <PatientName name={patient.name} />
            <span>
            <br />Gender: <b>{patient.gender}</b>,{" "}
            </span>
            <span>
            <br />DOB: <b>{patient.birthDate}</b>
            </span>
            <span>
            <br />Address: <b>{address}</b>
            </span>
        </div>
    );
}

export default class Patient extends React.Component {
    static contextType = FhirClientContext;
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            patient: null,
            encounter: null,
            appointment: null,
            error: null
        };
    }

    async componentDidMount() {
        const client = this.context.client;
        try {
            const patient = await client.patient.read();
            this.setState({ patient, loading: false, error: null });

            // Use fetchPatientEncounter from EncResources.js
            const encounter = await fetchPatientEncounter(client, patient.id);
            this.setState({ encounter });

            const appointment = await fetchPatientAppointment(client, patient.id, "2020-01-01T00:00:00.000Z","2022-01-01T00:00:00.000Z");
            this.setState({ appointment });

        } catch (error) {
            this.setState({ error, loading: false });
        }
    }

    render() {
        const { error, loading, patient, encounter, appointment } = this.state;
        if (loading) {
            return <div>Loading...</div>;
        }
        if (error) {
            return error.message;
        }
    
        return (
            <div>
                <PatientBanner {...patient} />
                <div>
                    {encounter ? (
                        <div>
                            <h2>Encounters</h2>
                            <EncounterJSON encounters={encounter} />
                        </div>
                    ) : (
                        <div>Loading encounters...</div>
                    )}
                </div>
                <div>
                    {appointment ? (
                        <div>
                            <h2>Appointments</h2>
                            <AppointmentJSON appointments={appointment} />
                        </div>
                    ) : (
                        <div>Loading appointments...</div>
                    )}
                </div>
            </div>
        );
    }
    
}
