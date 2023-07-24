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
          <Route path="/signup" element={<Signup />}  />
          <Route path="/login" element={<Login />}  />

          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/servDir" element={<ServDir />} />
          <Route path="/dash" element={<Dash />} />
          <Route path='/ProviderDash' element={<ProviderDash />} />
          <Route path='/ClientDash' element={<ClientDash />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/help" element={<Help />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/assist" element={<Assist />} />
          
          <Route path="/encounter/:id" element={<EncounterDetail />} />
          <Route path="/patientOverview" element={<PatientOverview />} />

          <Route path="/providerPatients" element={<ProviderFHIR />} />

          <Route path="/providerForm" exact element={<ProviderFormPage />} />
          <Route path="/providers" element={<ProviderListPage />} />
        </Routes>
      
    </div>
 
);

}

function EncounterDetail({ match }) {
  return <h2>Encounter ID: {match.params.id}</h2>;
}

export default App;
