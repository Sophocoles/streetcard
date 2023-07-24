import React from "react";

function Help (){
    var popCount;
    
    return(
            <div id="helpContent">
                <h2>Homeless Population Count: {popCount}</h2>

                <div id="helpLinks">
                    <p>-donation links here-</p>
                </div>
            </div>
    
    );
}

export default Help;