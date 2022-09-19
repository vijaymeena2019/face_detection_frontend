import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ faceBoxCoordinates, imageUrl }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt='' src={imageUrl} width='300px' height='auto' />
                <div className="bounding-box" style={{ top: faceBoxCoordinates.topRow, right: faceBoxCoordinates.rightCol, bottom: faceBoxCoordinates.bottomRow, left: faceBoxCoordinates.leftCol }}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;



// leftCol: clarifaiFace.left_col * width,
// topRow: clarifaiFace.top_row * height,
// rightCol: width - (clarifaiFace.right_col * width),
// bottomRow: height - (clarifaiFace.bottom_row * height)