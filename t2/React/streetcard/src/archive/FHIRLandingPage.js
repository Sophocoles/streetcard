import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import { MyForm } from './django/MyForm.';
import BackendForm from './BackendForm';

function FHIRLandingPage() {

  /*
   const [formFields, setFormFields] = useState(null);

  useEffect(() => {
    MyForm('/my-form/')
      .then(data => setFormFields(data));
  }, []);

  if (!formFields) {
    return <div>Loading...</div>;
  }
  */
 

  return (
    <div className="landing-page">
      <div id="header">FHIR shortcuts</div>
      <BackendForm path="" />
      <Link to="/providerLogin"><button className="large-center-button">Provider Facing FHIR app</button></Link>
      <Link to="/Launcher"><button className="large-center-button">ARCHIVE: FHIR React App</button></Link>
      <Link to="/DjangoDisplay"><button className="large-center-button">ARCHIVE: FHIR tests</button></Link>
      <Link to="/Display"><button className="large-center-button">ARCHIVE: App dev</button></Link>
    </div>
  );





  /*
  <div className="landing-page">
      <div id="header">FHIR shortcuts</div>
      <form>
        {formFields.fields.map(field => (
          <div key={field.name}>
            <label>{field.label}</label>
            <input type={field.type} name={field.name} />
          </div>
        ))}
      </form>
      <Link to="/providerLogin"><button className="large-center-button">Provider Facing FHIR app</button></Link>
      <Link to="/Launcher"><button className="large-center-button">ARCHIVE: FHIR React App</button></Link>
      <Link to="/DjangoDisplay"><button className="large-center-button">ARCHIVE: FHIR tests</button></Link>
      <Link to="/Display"><button className="large-center-button">ARCHIVE: App dev</button></Link>
    </div>
  */
}

export default FHIRLandingPage;
