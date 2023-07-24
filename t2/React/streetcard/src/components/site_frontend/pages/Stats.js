import React from "react";

function Stats () {
    var numNights = 10;
    var numClients = 10;
    var successRate = 10;
    var numMeals = 10;
    var numStableHousing = 10;
    
    return(
    
            
            <div className="statsContent">
                <h2>Number of Nights Spent at Homeless Shelters Participating in SC?</h2>
                <p>{numNights}</p>
                <h2>Number of Nights Spent at Homeless Shelters Participating in SC?</h2>
                <p>{numClients}</p>
                <h2>Number of Nights Spent at Homeless Shelters Participating in SC?</h2>
                <p>{successRate}</p>
                <h2>Number of Nights Spent at Homeless Shelters Participating in SC?</h2>
                <p>{numMeals}</p>
                <h2>Number of Nights Spent at Homeless Shelters Participating in SC?</h2>
                <p>{numStableHousing}</p> 
            </div>
     
        
    );
}

export default Stats;