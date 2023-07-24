import React from "react";

function ProviderDash() {
    return (
            <div className="DashboardContent">
                <div className="tier1">
                    <div className="providerPantries">
                        <div className="PPContent">
                            <h2>Closest Food Pantries</h2>
                            <p>
                                --Example--<br></br>
                                Pantry Name #1 (1.2 miles away)<br></br>
                                Pantry Name #2 (2.8 miles away)<br></br>
                                Pantry Name #3 (4.2 miles away)<br></br>
                                Pantry Name #4 (8.2 miles away)<br></br>
                                Pantry Name #5 (10.5 miles away)
                            </p>
                        </div>
                    </div>
                    
                    <div className="providerKitchens">
                        <div className="PKContent">
                            <h2>Closest Soup Kitchens</h2>
                            <p>
                                --Example--<br></br>
                                Soup Kitchen Name #1 (1.2 miles away)<br></br>
                                Soup Kitchen Name #2 (2.8 miles away)<br></br>
                                Soup Kitchen Name #3 (4.2 miles away)<br></br>
                                Soup Kitchen Name #4 (8.2 miles away)<br></br>
                                Soup Kitchen Name #5 (10.5 miles away)
                            </p>
                        </div>
                    </div>
                    
                    <div className="providerGoods">
                        <div className="PGContent">
                            <h2>Goods in Stock:</h2>
                            <p>
                                1. Diapers <br></br>
                                2. Coats <br></br>
                                3. Shoes <br></br>
                                4. Boots <br></br>
                                5. Hats <br></br> 
                            </p>
                        </div>
                    </div>
                    
                    <div className="providerShelters">
                        <div className="PSContent">
                            --Example--<br></br>
                            Shelter Name #1 (1.2 miles away)<br></br>
                            Shelter Name #2 (2.8 miles away)<br></br>
                            Shelter Name #3 (4.2 miles away)<br></br>
                            Shelter Name #4 (8.2 miles away)<br></br>
                            Shelter Name #5 (10.5 miles away)

                        </div>
                    </div>
                </div>
                <div className="tier2">
                    <div className="providerMedical">
                        <div className="EHRContainer">
                            <h2>Fetch Medical EHR for a Specific Patient</h2>
                            <label for="streetcardID"> Patient's StreetCard ID:</label>
                            <input type={"text"} className="streetcardID" name="streetcardID"></input>
                        </div>
                    </div>
                    <div className="providerPsychiatric">
                        <div className="EHRContainer">
                            <h2>Fetch Psychiatric EHR for a Specific Patient</h2>
                            <label for="streetcardID"> Patient's StreetCard ID:</label>
                            <input type={"text"} className="streetcardID" name="streetcardID"></input>
                        </div>
                    </div>
                    <div className="providerRehabilitative">
                        <div className="bedDirectory">
                            <p>
                                Bed Directory List and Contact Info
                            </p>
                        </div>
                    </div>
                </div>
                <div className="tier3">
                    <div className="providerSS">
                        <div className="providerDisabilities">
                            <h2>Disabilities Tab</h2>
                            <p>
                                Disabilities Information
                            </p>
                        </div>
                        <div className="providerEmployment">
                            <h2>Employment Tab</h2>
                            <p>
                                Employment Information
                            </p>
                        </div>
                        <div className="providerAging&Adults">
                            <h2>Aging & Adults Tab</h2>
                            <p>
                                Aging and Adults List of Patients
                            </p>
                        </div>
                    </div>
                    <div className="providerHMISData">
                        <div className="CoC">
                            <p>CoC Tab Placeholder</p>
                        </div>
                        <div className="HOPWATab">
                            <p>HOPWA Tab Placeholder</p>
                        </div>
                        <div className="VASHTab">
                            <p> VASH Tab Placeholder</p>
                        </div>
                        <div className="RHYTab">
                            <p>RHY Tab Placeholder</p>
                        </div>
                        <div className="ESGTab">
                            <p>ESG Tab Placeholder</p>
                        </div>
                        <div className="RHSPTab">
                            <p>RHSP Tab Placeholder</p>
                        </div>
                    </div>
                </div>
                <div className="tier4">
                    <div className="legalInfo">
                        <p>
                            Legal Info
                        </p>
                    </div>
                </div>
            </div>

    );
}

export default ProviderDash;