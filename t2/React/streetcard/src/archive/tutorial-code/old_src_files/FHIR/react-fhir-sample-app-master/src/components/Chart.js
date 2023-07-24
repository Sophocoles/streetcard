import React, { Component, Fragment, useState, useEffect } from "react";
import { FhirClientContext } from "../FhirClientContext";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './Chart.css'
import axios from 'axios';


export default class Chart extends React.Component {
  static contextType = FhirClientContext;

  state = {
    encounters: [],
    selectedEncounter: null,
  };

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const client = this.context.client;
    const r = new URLSearchParams();
    console.log(client.getPatientId(), "patientId");
    r.set("patient", client.getPatientId() || this.context.patientId);

    client
      .request(`Encounter?${r.toString()}`, {
        pageLimit: 0,
        flat: true,
      })
      .then((encounters) => {

         




        this.setState({ encounters: encounters });

        //To handle API filters


      })
      .catch((error) => {
        console.error(error, "Inside error");
      });
  }

  handleEncounterClick = (encounter) => {
    this.setState({ selectedEncounter: encounter });


    
  };
  
  renderEncounter(encounter) {
    return (
      <div key={encounter.id} onClick={() => this.handleEncounterClick(encounter)}>
        <h2>Encounter: {encounter.id}</h2>
        
        <p>Status: {encounter.status}</p>
        
      </div>
    );
  }
  

//<p>Period: {encounter.period.start} - {encounter.period.end}</p>
//p>Location: {encounter.location}</p> {/* Add this line */}


  renderEncounterDetails() {
    const encounter = this.state.selectedEncounter;
    if (!encounter) return null;
    const client = this.context.client;
    client
      .request(`Observation?encounter=${encounter.id}&category=vital-signs`, {
        pageLimit: 0,
        flat: true,
      })
      .then((observations) => {
        console.log(observations, "Observations");
        // TODO: Set the observations data to the state
      })
      .catch((error) => {
        console.error(error, "Inside error");
      });
  
    return (
      <div className="encounter-details-overlay">
        <div className="encounter-details">
          <h2>Encounter Details: {encounter.id}</h2>
          <p>Class: {encounter.class.display}</p>
          <p>Id: {encounter.id}</p>
         
          {/* Render all other relevant encounter data */}
        </div>
      </div>
    );
  }
  
  // <p>Type: {encounter.type.map((type) => type.text).join(", ")}</p>
  

  render() {
    return (
      <div className="chart-container">
        <div className="encounters-list">
          {this.state.encounters.map((encounter) => this.renderEncounter(encounter))}
        </div>
        <div className="encounter-details-container">
          {this.renderEncounterDetails()}
        </div>
      </div>
    );
  }
}
