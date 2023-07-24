async function getPatientId(fhirEndpointUrl, firstName, lastName) {
    // Construct the patient search URL
    const searchUrl = `${fhirEndpointUrl}/Patient?family=${encodeURIComponent(lastName)}&given=${encodeURIComponent(firstName)}`;
  
    try {
      // Fetch the patient data
      const response = await fetch(searchUrl);
  
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
  
      // Parse the JSON response
      const data = await response.json();
  
      // Get the patient ID
      if (data.entry && data.entry.length > 0) {
        const patientId = data.entry[0].resource.id;
        return patientId;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
      return null;
    }
  }
 
  