import React, { Component, Fragment, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Launcher from "./FHIR/react-fhir-sample-app-master/src/components/Launcher";
import Chart from "./FHIR/react-fhir-sample-app-master/src/components/Chart";
import Redirect from "./FHIR/react-fhir-sample-app-master/src/components/Redirect";
import ApptResources from "./FHIR/react-fhir-sample-app-master/src/components/Resources/ApptResources";
import EncResources from "./FHIR/react-fhir-sample-app-master/src/components/Resources/EncResources";
import ObsResources from "./FHIR/react-fhir-sample-app-master/src/components/Resources/ObsResources";
import SeeOperations from "./FHIR/react-fhir-sample-app-master/src/components/SeeOperations";
import ResourceProvider from "./FHIR/react-fhir-sample-app-master/src/components/ResourceProvider";
import ResourceContext from "./FHIR/react-fhir-sample-app-master/src/components/ResourceContext";
import LandingPage from "../LandingPage";
import FHIRLandingPage from "../FHIRLandingPage";
import DjangoDisplay from "./FHIR/Django/DjangoDisplay"
import Display from "./FHIR/App/src/components/Display"
import axios from 'axios';
import './App.css'






console.log("Inside app"); 

//Give values manually
const streetcardItems = [
  {
    id:5,
    name: "cerner",
    client_id: "taken from .env.local",
    scope: "openid profile patient/Patient.read patient/AllergyIntolerance.read patient/Condition.read",
    url: "https://fhir-myrecord.cerner.com/dstu2/ec2458f2-1e24-41c8-b71b-0e701af7583d",
    redirect_uri:"http://localhost:9000/redirect",
    patientId: "",
    patientName: "",
  }
]
//End setup of Django fields


//What does


//Path Routing start
function App() {


 


  return (
    <ResourceProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/redirect" element={<Redirect />} />
            <Route path="/apptResources" element={<ApptResources />} />
            <Route path="/encResources" element={<EncResources />} />
            <Route path="/obsResources" element={<ObsResources />} />
            <Route path="/Launcher" element={<Launcher />} />
            <Route path="/FHIRLandingPage" element={<FHIRLandingPage />} />
            <Route path="/DjangoDisplay" element={<DjangoDisplay />} />
            <Route path="/Display" element={<Display />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/encounter/:id" component={EncounterDetail} />
            <Route exact path="/" component={Chart} />
          </Routes>
        </BrowserRouter>
      </div>
    </ResourceProvider>
  );
  
//Path Routing end
}

function EncounterDetail({ match }) {
  return <h2>Encounter ID: {match.params.id}</h2>;
}














export default App;
