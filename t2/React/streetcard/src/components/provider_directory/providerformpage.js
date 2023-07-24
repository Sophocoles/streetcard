import React from "react";
import ProviderForm from "./providerform";
import './formStyle.css';

const ProviderFormPage =() => {
    return (
        <div>
            <h1>Add a new Provider below</h1>
            <ProviderForm />
        </div> 
    );
};

export default ProviderFormPage;