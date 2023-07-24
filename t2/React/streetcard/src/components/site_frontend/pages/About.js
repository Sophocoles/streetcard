import React from 'react';

import './pages.css';

import image1 from './images/homelesshelp1.png';
import image2 from './images/techHelp.png';

function About () {
    return (
      
            <div className='aboutSection'>
                <h2 className='aboutHeader'>StreetCard is Streamlining Benefits Access for Homeless Persons!</h2>

                <p className='aboutContent'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse erat ligula, pretium vitae eleifend quis, pretium sed justo. Nulla et urna sed sapien egestas feugiat. Phasellus at ultrices metus. 
                    Sed et egestas elit. Aenean aliquet nisi in leo blandit tristique. Donec urna turpis, volutpat ac est id, fermentum ultricies ipsum. Aliquam sollicitudin sem eu tortor fermentum, quis pellentesque orci lobortis. 
                    Etiam volutpat fermentum ex ut luctus. dabsiudbaisudbauisbdiausbdiuabsdibasdibasdiu <br></br><br></br>
                </p>
                    <img src={image1} alt="imagePrime" className='images' /><br></br>
                <p className='aboutContent'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse erat ligula, pretium vitae eleifend quis, pretium sed justo. Nulla et urna sed sapien egestas feugiat. Phasellus at ultrices metus. 
                    Sed et egestas elit. Aenean aliquet nisi in leo blandit tristique. Donec urna turpis, volutpat ac est id, fermentum ultricies ipsum. Aliquam sollicitudin sem eu tortor fermentum, quis pellentesque orci lobortis. 
                    Etiam volutpat fermentum ex ut luctus. <br></br><br></br>
                </p>
                    <img src={image2} alt="imageDos" className='images'></img><br></br>
                <p className='aboutContent'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse erat ligula, pretium vitae eleifend quis, pretium sed justo. Nulla et urna sed sapien egestas feugiat. Phasellus at ultrices metus. 
                    Sed et egestas elit. Aenean aliquet nisi in leo blandit tristique. Donec urna turpis, volutpat ac est id, fermentum ultricies ipsum. Aliquam sollicitudin sem eu tortor fermentum, quis pellentesque orci lobortis. 
                    Etiam volutpat fermentum ex ut luctus.
                </p>
            </div>
       
    );
};

export default About;