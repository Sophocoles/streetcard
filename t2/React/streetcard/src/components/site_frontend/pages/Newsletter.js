import React from 'react';
import { Router, Link } from 'react-router-dom';

function Newsletter () {
    return (
        <div id='pageWrapper'>
        
            <div className='newsContent'>
                <div className='newsHeader'>
                    <h2> Welcome to the StreetCard Newsletter! </h2>
                </div>
                <div className='newsFeed'>
                    <div className='newsEntry'>
                        <Link to='/'>
                            <h3> - INSERT DATE AND TITLE HERE -</h3>
                            <p> - INSERT NEWSLETTER CONTENT FOR SPECIFIC DATE HERE - </p>
                            <div className='entryImgContainer'>
                                <p>image here</p>
                            </div>
                        </Link>
                    </div>
                    
                    <div className='newsEntry'>
                        <h3> - INSERT DATE AND TITLE HERE -</h3>
                        <p> - INSERT NEWSLETTER CONTENT FOR SPECIFIC DATE HERE - </p>
                        <div className='entryImgContainer'>
                            <p>image here</p>
                        </div>
                    </div>

                    <div className='newsEntry'>
                        <h3> - INSERT DATE AND TITLE HERE -</h3>
                        <p> - INSERT NEWSLETTER CONTENT FOR SPECIFIC DATE HERE - </p>
                        <div className='entryImgContainer'>
                            <p>image here</p>
                        </div>
                    </div>

                    <div className='newsEntry'>
                        <h3> - INSERT DATE AND TITLE HERE -</h3>
                        <p> - INSERT NEWSLETTER CONTENT FOR SPECIFIC DATE HERE - </p>
                        <div className='entryImgContainer'>
                            <p>image here</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='newsletterSignup'>
                <h2>Sign Up to Get E-Mail Notifications About Posts!</h2>
                <form method="post" action="submit">
                    <div className='signupTextboxes'>
                        <label for="userFirstName"> *First Name </label>
                        <input type={"text"} id="userFirstName" name="userFirstName" required></input><br></br>
                        <label for="userLastName"> *Last Name </label>
                        <input type={"text"} id="userLastName" name="userLastName" required></input><br></br>
                        <label for="userEMail"> *E-Mail Address </label>
                        <input type={"text"} id="userEMail" name="userEMail" required></input><br></br><br></br>
                    </div>

                    <div className='radios'>
                        <label for="userPrimaryInterest"> Primary Interest, please select one</label><br></br>
                        <input type="radio" id="choice1" name="Partners" value="Partners"></input>
                        <label for="age1">Partners</label>
                        <br></br>
                        <input type="radio" id="choice2" name="Developments" value="TechDevelopments"></input>
                        <label for="choice2">Tech Developments</label>
                        <br></br>
                        <input type="radio" id="choice3" name="Outreach" value="Outreach"></input>
                        <label for="choice3">Outreach</label><br></br>
                        <input type="submit" className='signupButton'></input>
                    </div>                    
                </form>
            </div>
        </div>
        
    );
}

export default Newsletter;