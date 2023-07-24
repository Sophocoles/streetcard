import React from "react";

import { Link } from "react-router-dom";

function Dash() {
    return (

            <div className="DashboardContent">
                <div className="providerLogin">
                    <form>
                        <p>
                            Im the provider login space
                        </p>
                        <Link className="login" to="/login">Login</Link>
                    </form>
                </div>
                <div className="clientLogin">
                    <form>
                        <p>
                            Im the client login space
                        </p>
                        <Link className="login" to="/login">Login</Link>
                    </form>
                </div>
                <div className="newsletterModLogin">
                    <form>
                        <p>
                            Im the newsletter moderator space (goes to client dash)
                        </p>
                        <Link className="login" to="/clientDash">Login</Link>
                    </form>
                </div>
            </div>

    );
}

export default Dash;