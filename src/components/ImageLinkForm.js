import React from 'react';
import './ImageLinkForm.css'



const ImageLinkForm = ({ onPictureUrlChange, onPictureSubmit }) => {

    // const ImageLinkForm = ({ onChangefn, onButtonClick, appUserId, updateEntries })   

    // const updateData = () => {
    //     fetch('http://localhost:3000/image', {
    //         method: 'put',
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             id: appUserId
    //         })
    //     }).then(response => response.json())
    //         .then(userentries => {
    //             updateEntries(userentries);
    //             onButtonClick();
    //         })
    // }

    return (
        <div >
            <p className='f3'>This Magic Brain will detect faces in your pictures. Give it a try.</p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input onChange={onPictureUrlChange} className='f4 pa2 w-70 center' type="text" placeholder='Paste Your Image URL' />
                    <button onClick={onPictureSubmit} className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple tc">Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;