import React from 'react';

import "./components.css";

const colors = ["#0088FE", "#00C49F", "#FFBB28"];
const delayMS = 2500;


const Slideshow = () => {
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        setTimeout(
            () => setIndex((prevIndex) =>
                prevIndex === colors.length - 1 ? 0 : prevIndex + 1), delayMS
        );

        return () => {};
    }, [index]);
    
    return ( 
    <div className="slideshow">
        <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }} >
            {colors.map((backgroundColor, index) => (
                <div 
                    className="slide" 
                    key={index} 
                    style={{ backgroundColor }}></div>
            ))}
        </div>
        <div className="slideshowDots">
            {colors.map((_, idx) => (
                <div key={idx} className="slideshowDot"></div>
            ))}
        </div>
    </div> 
    );
}
 
export default Slideshow;