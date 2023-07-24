import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import Home from './site_frontend/pages/Home';
import About from './site_frontend/pages/About';
import Mission from './site_frontend/pages/Mission';
import Newsletter from './site_frontend/pages/Newsletter';
import ServDir from './site_frontend/pages/ServDir';
import Dash from './site_frontend/pages/Dash';
import ProviderDash from './site_frontend/pages/ProviderDash';
import ClientDash from './site_frontend/pages/ClientDash';
import Stats from './site_frontend/pages/Stats';
import Help from './site_frontend/pages/Help';
import Contact from './site_frontend/pages/Contact';
import Assist from './site_frontend/pages/Assist';
import Navbar from "./site_frontend/components/Navbar";

import axios from 'axios';
import { ToastContainer } from "react-toastify";
import Signup from "./django/auth/signup/Signup"
import Login from "./django/auth/login/Login";

import ProviderFHIR from "./provider_FHIR_app/pages/ProviderFHIR";
import PatientOverview from "./provider_FHIR_app/pages/PatientOverview";

import ProviderFormPage from "./provider_directory/providerformpage";
import ProviderListPage from "./provider_directory/providerlistpage";

function App() {

  
  return (
 
    <div>
      
      
      <ToastContainer hideProgressBar={true} newestOnTop={true} />
      <Navbar/>
        <Routes>
          <Route path="/t2/signup" element={<Signup />}  />
          <Route path="/t2/login" element={<Login />}  />

          <Route path="/t2/" exact element={<Home />} />
          <Route path="/t2/about" element={<About />} />
          <Route path="/t2/mission" element={<Mission />} />
          <Route path="/t2/newsletter" element={<Newsletter />} />
          <Route path="/t2/servDir" element={<ServDir />} />
          <Route path="/t2/dash" element={<Dash />} />
          <Route path='/t2/ProviderDash' element={<ProviderDash />} />
          <Route path='/t2/ClientDash' element={<ClientDash />} />
          <Route path="/t2/stats" element={<Stats />} />
          <Route path="/t2/help" element={<Help />} />
          <Route path="/t2/contact" element={<Contact />} />
          <Route path="/t2/assist" element={<Assist />} />
          
          <Route path="/t2/encounter/:id" element={<EncounterDetail />} />
          <Route path="/t2/patientOverview" element={<PatientOverview />} />

          <Route path="/t2/providerPatients" element={<ProviderFHIR />} />

          <Route path="/t2/providerForm" exact element={<ProviderFormPage />} />
          <Route path="/t2/providers" element={<ProviderListPage />} />
        </Routes>
      
    </div>
 
);

}

function EncounterDetail({ match }) {
  return <h2>Encounter ID: {match.params.id}</h2>;
}

export default App;
