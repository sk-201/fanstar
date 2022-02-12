import React from 'react';
import API from '../../api';
import './ConfirmationScreen.css';

const ConfirmationScreen = (props) => {
  const { close, url, refresh } = props;

  const handleDelete = async () => {
    try {
      await API.delete(`/api/artist/private/deleteimage/${url}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
        },
      });
      // console.log(data);
      alert('Image deleted!');
      close();
      refresh();
    } catch (error) {
      console.log(error);
      close();
    }
  };

  return (
    <div className='myImage-confirmation-container'>
      <div className='myImage-confirmation-cardDiv'>
        <div className='myImage-confirmation-close'>
          <button className='myImage-close-confirmation' onClick={close}>
            +
          </button>
        </div>
        <div className='myImage-confirmation-contentDiv'>
          <p className='myImage-confirmation-content'>
            {`Confirm to delete this image`}
          </p>
        </div>
        <button className='myImage-remove-artistBtn' onClick={handleDelete}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
