import React from 'react';
// import { imageUrl } from '../../utils';
import './ConfirmationScreen.css';

const ConfirmationScreen = (props) => {
  const { close, selectedImg } = props;
  console.log(selectedImg);
  return (
    <div className='puralbum-confirmation-container'>
      <div className='puralbum-confirmation-cardDiv'>
        <button className='puralbum-close-confirmation' onClick={close}>
          +
        </button>
        <img className='puralbum-image' src={selectedImg} />
      </div>
    </div>
  );
};

export default ConfirmationScreen;
