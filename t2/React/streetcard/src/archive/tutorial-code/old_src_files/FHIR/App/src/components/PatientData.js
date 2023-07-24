import React from "react";
//import ChartJS from "chart.js";
import ChartJS from 'chart.js';
import { FhirClientContext } from "../FhirClientContext";

export default class PatientData extends React.Component {
    static contextType = FhirClientContext;

    loadData() {
        const client = this.context.client;

       const request =  client.request('Patient?_count=50', {
            pageLimit: 0,
            flat: true
          })
            .then((patients) => {
              console.log(patients);
            })
            .catch((error) => {
              console.error(error);
              this.displayData(request)
            });       

    } // end function

    displayData(inputData)
    {
        console.log(inputData)
    }

    render() {
        return <canvas id="myChart" width="600" height="400" />;
    }
}