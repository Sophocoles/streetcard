import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-page">
      <div id="header">Welcome to StreetCard development shortcuts</div>
      <Link to="/FHIRLandingPage"><button className="large-center-button">FHIR</button></Link>
      <button className="large-center-button">Old tier 1</button>
      <button className="large-center-button">Client landing page</button>
      <button className="large-center-button">Wagtail</button>
    </div>
  );
}

export default LandingPage;
