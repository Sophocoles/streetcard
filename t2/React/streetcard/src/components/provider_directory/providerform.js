import React, { useState } from 'react'
import axios from 'axios'
import './formStyle.css';
import { providerTypes, services } from './constants';


const ProviderForm = () => {
    const [providerType, setProviderType] = useState('');
    const [name, setName] = useState('');
    const [selectedServices, setSelectedServices] = useState([]);
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [hours, setHours] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [isParticipant, setIsParticipant] = useState(false);
    const [otherServices, setOtherServices] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        let apiUrl = 'http://127.0.0.1:8000/providers/';

       /* switch (providerType) {
            case 'Soup Kitchen':
                apiUrl = 'http://localhost:8000/ + soupkitchens/';
                break;
            case 'Clothing Depot':
                apiUrl = 'http://localhost:8000/clothingdepots/';
                break;
            case 'Drop-in Center':
                apiUrl = 'http://localhost:8000/dropincenters/';
                break;
            case 'Adult Day Treatment Programs':
                apiUrl = 'http://localhost:8000/adultdaytreatmentprograms/';
                break;
            case 'Food Pantries':
                apiUrl = 'http://localhost:8000/foodpantries/';
                break;
            case 'Shelters':
                apiUrl = 'http://localhost:8000/shelters/';
                break;
            default:
                alert('Please select a valid provider type');
                return;
        }*/

        const providerData = {
            provider_type: providerType,
            name: name,
            services: selectedServices.map((service) => ({name: service})),
            address: address,
            phone_number: phoneNumber,
            hours: hours,
            contact_person: contactPerson,
            email: email,
            website: website,
            is_participant: isParticipant,
            other_services: otherServices
        };

        try {
            const response = await axios.post(apiUrl, providerData);
            console.log(response.data);
            alert('Form submitted successfully!');

        } catch (error) {
            console.error('Error submitting form:', error);
            console.log(error.response.data);
        }

        setProviderType('');
        setName('');
        setSelectedServices([]);
        setAddress('');
        setPhoneNumber('');
        setHours('');
        setContactPerson('');
        setEmail('');
        setWebsite('');
        setIsParticipant(false);
        setOtherServices('');
    };

    const handleServicesChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedServices([...selectedServices, value]);
        } else {
            setSelectedServices(selectedServices.filter((service) => service !== value));
        }

    };


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="providerType">Type of Basic Needs Provider</label>
            <select id="providerType" value={providerType} onChange={(e) => setProviderType(e.target.value)}>
                <option value="">Select Provider Type</option>
                {providerTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            <label htmlFor="name">Provider Name:</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

            <label htmlFor="services">Services</label>
            {services[providerType] &&
                services[providerType].map((service) => (
                    <label key={service} className="service-label">
                        <input
                            type="checkbox"
                            id={service}
                            value={service}
                            checked={selectedServices.includes(service)}
                            onChange={(e) => handleServicesChange(e)}
                        />
                        {service}
                    </label>
                ))}

            <label htmlFor="address">Address</label>
            <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />

            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />

            <label htmlFor="hours">Hours</label>
            <input type="text" id="hours" value={hours} onChange={(e) => setHours(e.target.value)} required />

            <label htmlFor="contactPerson">Contact Person</label>
            <input type="text" id="contactPerson" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} required />

            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label htmlFor="website">Website</label>
            <input type="url" id="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
            <div className="checkbox-container">
        <label htmlFor="isParticipant">Participant</label>
        <input
          type="checkbox"
          id="isParticipant"
          checked={isParticipant}
          onChange={(e) => setIsParticipant(e.target.checked)}
        />
      </div>

            <label htmlFor="otherServices">Other services</label>
            <textarea id="otherServices" value={otherServices} onChange={(e) => setOtherServices(e.target.value)} />

            <button type="submit">Submit</button>
        </form>
    );

};

export default ProviderForm;