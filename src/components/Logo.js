import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain_logo.png';

const Logo = () => {
    return (  // we are using 'react-tilt' librery for good logo
        <div className="ma4 mt0 dib">
            <Tilt>
                <div style={{ height: '150px', width: '150px', background: 'linear-gradient(89deg, #FF5EDF 0%, #04C8DE 100%)' }}>
                    <img className="pa3" src={brain} alt="brain log" />
                </div>
            </Tilt>

        </div>
    )
}

export default Logo;