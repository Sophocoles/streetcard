import React from "react";
import ProviderList from "./providerlist";
import './listStyles.css';
import { Link } from "react-router-dom";

const ProviderListPage = () => {
    return (
        <div>
            <div className="top-right">
              <Link to="/providerForm"><button>New Provider?</button></Link>
            </div>
            <h1>Providers Directory</h1>
            <ProviderList />
        </div>
    );
};

export default ProviderListPage;
