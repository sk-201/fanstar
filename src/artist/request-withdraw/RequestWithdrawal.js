import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../../api';
import backArrow from '../../assets/backArrow.svg';
import './RequestWithdrawal.css';

const RequestWithdrawal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [boolVal, setBoolVal] = useState(false);

  if (!location.state) {
    navigate('/income');
  }

  const fetchRequestList = async () => {
    try {
      const { data } = await API.get('/api/artist/private/getownwithdrawals', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
        },
      });
      setWithdrawRequests(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchRequestList();
      setBoolVal(true);
    }
  }, [boolVal]);

  const handleChange = (e) => {
    if (e.target.value <= location.state) {
      setWithdrawAmount(e.target.value);
    }
  };

  const submitWithdrawRequest = async () => {
    try {
      await API.post(
        '/api/artist/private/withdraw',
        {
          amount: withdrawAmount,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
          },
        }
      );
      setWithdrawAmount('');
      alert('Request sent!');
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='request-container'>
      <div className='request-headerDiv'>
        <button className='request-backBtn' onClick={() => navigate('/income')}>
          <img src={backArrow} alt='back' className='request-backIcon' />
        </button>
        <h3 className='request-heading'>Request payment</h3>
      </div>
      <div className='request-contentDiv'>
        <div className='request-content'>
          <h3 className='request-contentHeading'>Withdrawable Balance</h3>
          <p className='request-contentAmount'>
            {`Rs ${location.state ? location.state : 0}/-`}
          </p>
        </div>
        {/* <div className='request-listDiv'>

        </div> */}
        <div className='request-amountForm'>
          <label className='request-amount'>Enter amount</label>
          <input
            type='number'
            min='0'
            value={withdrawAmount}
            max={location.state ? location.state : 0}
            placeholder='Ex. 500'
            className='request-amountInput'
            onChange={handleChange}
          />
          <button className='request-amountBtn' onClick={submitWithdrawRequest}>
            Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestWithdrawal;
