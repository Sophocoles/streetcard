import React from "react";
import { oauth2 as SMART } from "fhirclient";
import { FhirClientContext } from "../FhirClientContext";

export default class SelectClient extends React.Component {
    static contextType = FhirClientContext;

    constructor(props) {
        super(props);
        this.state = {
            providerKey: "",
            fhirconfig: null,
            error: null
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, context) {
        const providerKey = event.target.value;
        fetch(`/config/?provider=${providerKey}`)
            .then(response => response.json())
            .then(data => {
                const fhirconfig = {
                    client_id: data.client_id,
                    scope: data.scope,
                    redirect_uri: data.redirect_uri
                };
                this.setState({ providerKey, fhirconfig });
                if (fhirconfig.client_id) {
                    context.setClient({
                        client_id: fhirconfig.client_id,
                        scope: fhirconfig.scope,
                        redirect_uri: fhirconfig.redirect_uri
                    });
                    SMART.authorize(fhirconfig);
                }
            })
            .catch(error => {
                this.setState({ error });
            });
    }
}
