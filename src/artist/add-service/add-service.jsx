import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as BackArrow } from '../../assets/backArrow.svg';
import API from '../../api';
import './add-service.css';
const AddService = () => {
  const navigate = useNavigate();
  const [serviceName, setserviceName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const createService = async (event) => {
    event.preventDefault();
    try {
      if (
        serviceName.trim() !== '' &&
        amount.trim() !== '' &&
        description.trim() !== ''
      ) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
          },
        };
        await API.post(
          '/api/artist/private/createservice',
          { serviceName, amount, description },
          config
        );
        alert('Service Created');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='add-service'>
      <BackArrow id='bck-arrow' onClick={() => navigate('/artist/landing')} />
      <span id='add-service-text'>Add Service</span>
      <div className='add-service-form'>
        <form onSubmit={createService}>
          <label for='serv-name'> Service Name</label>
          <input
            id='serv-name'
            type='text'
            className='inp-add'
            value={serviceName}
            placeholder='typing...'
            onChange={(e) => setserviceName(e.target.value)}
          />
          <label for='total-amt'> Total Amount</label>
          <input
            id='total-amt'
            type='text'
            className='inp-add'
            placeholder='Rs'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <label for='serv-desc'> Service Description</label>
          <input
            id='serv-desc'
            type='text'
            className='inp-add'
            placeholder='typing...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button id='btn-add-service' type='submit'>
            Add Service
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddService;
