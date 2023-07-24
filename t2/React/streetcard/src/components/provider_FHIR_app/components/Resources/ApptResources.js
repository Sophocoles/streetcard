import { FhirClientContext } from "../../fhir/FhirClientContext";

export async function fetchPatientAppointment(client, patientId, startDate, endDate, count = 10, status = 'booked') {
  try {
    const headers = {
      Accept: "application/fhir+json",
    };

    const apptQueryParams = `patient=${patientId}&status=${status}&date=ge${startDate}&date=le${endDate}`;
    const appointmentResponse = await client.request(`Appointment?${apptQueryParams}`, { headers });
    const appointments = appointmentResponse.entry?.map(entry => entry.resource) || [];

    // Sort appointments by date in descending order
    appointments.sort((a, b) => {
      const dateA = new Date(a.start || 0);
      const dateB = new Date(b.start || 0);
      return dateB - dateA;
    });

    // Return the specified number of most recent appointments (default 10)
    return appointments.slice(0, count);
  } catch (error) {
    throw error;
  }
}
