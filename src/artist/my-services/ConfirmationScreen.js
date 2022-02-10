import React from 'react';
import API from '../../api';
import './ConfirmationScreen.css';

const ConfirmationScreen = (props) => {
  const { close, id, refresh } = props;

  const handleDelete = async () => {
    try {
      const { data } = await API.delete(
        `/api/artist/private/deleteservice/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
          },
        }
      );
      console.log(data);
      alert('Service deleted!');
      close();
      refresh();
    } catch (error) {
      console.log(error);
      close();
    }
  };

  return (
    <div className='confirmation-container'>
      <div className='confirmation-cardDiv'>
        <div className='confirmation-close'>
          <button className='close-confirmation' onClick={close}>
            +
          </button>
        </div>
        <div className='confirmation-contentDiv'>
          <p className='confirmation-content'>Confirm to delete this service</p>
        </div>
        <button className='remove-artistBtn' onClick={handleDelete}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
