import React from 'react';
import './ConfirmationScreen.css';

const ConfirmationScreen = (props) => {
  const { close, handleStatusFunc, handleMeetFunc, type } = props;
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
            {type === 'status'
              ? 'Confirm to mark service as complete'
              : 'Confirm to generate google meet link'}
          </p>
        </div>
        <button
          className='remove-artistBtn'
          onClick={type === 'status' ? handleStatusFunc : handleMeetFunc}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
