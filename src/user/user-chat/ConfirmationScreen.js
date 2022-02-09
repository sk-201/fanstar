import React from 'react';
import './ConfirmationScreen.css';

const ConfirmationScreen = (props) => {
  const { close, handleStatusFunc } = props;
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
            Confirm to mark service as complete
          </p>
        </div>
        <button className='remove-artistBtn' onClick={handleStatusFunc}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
