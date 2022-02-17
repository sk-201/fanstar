import React, { useState } from 'react';
import API from '../../api';
import './ConfirmationScreen.css';

const ConfirmationScreen = (props) => {
  const { close } = props;
  const [price, setPrice] = useState('');

  const handleChangePrice = async () => {
    try {
      await API.put(
        '/api/artist/private/updatechatprice',
        {
          chatPrice: price,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
          },
        }
      );
      // console.log(data);
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='price-confirmation-container'>
      <div className='price-confirmation-cardDiv'>
        <div className='price-confirmation-close'>
          <button className='close-confirmation' onClick={close}>
            +
          </button>
        </div>
        <div className='price-confirmation-contentDiv'>
          <p className='price-confirmation-content'>Per message price</p>
          <input
            type='number'
            min='1'
            value={price}
            placeholder='Message price'
            className='price-inputField'
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button className='remove-artistBtn' onClick={handleChangePrice}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;