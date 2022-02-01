import React from 'react';
import './ConfirmationScreen.css';

const ConfirmationScreen = (props) => {
  const { close, deleteArtist } = props;
  return (
    <div className='confirmation-container'>
      <div className='confirmation-cardDiv'>
        <div className='confirmation-close'>
          <button className='close-confirmation' onClick={close}>
            +
          </button>
        </div>
        <div className='confirmation-contentDiv'>
          <p className='confirmation-content'>
            Are you sure you want to remove this artist?
          </p>
        </div>
        <button className='remove-artistBtn' onClick={deleteArtist}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
