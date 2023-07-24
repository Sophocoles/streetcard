import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './listStyles.css';

const ProviderList = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/providers/list/');
        setProviders(response.data);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
        <ul>
            {providers.map((provider) => (
                <li key={provider.id}>
                    <h2>{provider.name}</h2>
                    <p>Type: {provider.provider_type}</p>
                    <p>Address: {provider.address}</p>
                    <p>Phone: {provider.phone_number}</p>
                    <p>Email: {provider.email}</p>
                    <p>Services:</p>
                    <ul>
                        {provider.services.map((service) => (
                            <li key={service.id}>{service.name}</li>
                        ))}
                    </ul>
                    <p>Website: {provider.website}</p>
                    <p>Other Services: {provider.other_services}</p>
                    <p>StreetCard participant: {provider.is_participant ? "Yes" : "No"}</p>
                    

                </li>
            ))}
        </ul>
    </div>
);
};


export default ProviderList;
