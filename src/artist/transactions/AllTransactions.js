import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';
import API from '../../api';
import backArrow from '../../assets/backArrow.svg';
import './AllTransactions.css';

const AllTransactions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [boolVal, setBoolVal] = useState(false);
  const [loading, setLoading] = useState(true);
  const state = location.state;

  if (!state) {
    navigate('/income');
  }

  const fetchPaymentHistory = async () => {
    try {
      const { data } = await API.get('/api/artist/private/getownpayments', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
        },
      });
      console.log(data);
      setPaymentDetails(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchPaymentHistory();
      setBoolVal(true);
    }
  }, [boolVal]);

  return (
    <div className='artistTrans-container'>
      <div className='artistTrans-header'>
        <button
          className='artistTrans-backBtn'
          onClick={() => navigate('/income')}
        >
          <img src={backArrow} alt='back' className='artistTrans-backIcon' />
        </button>
        <h3 className='artistTrans-heading'>My Total Earnings</h3>
      </div>
      <div className='artistTrans-listDiv'>
        {loading === true ? (
          <h3 className='artistTrans-loading'>Loading...</h3>
        ) : (
          <Fragment>
            {paymentDetails.map((payment) => (
              <div className='artistTrans-singleTrans' key={payment._id}>
                <div className='artistTrans-contentDiv'>
                  <h3 className='artistTrans-orderId'>{`#${payment._id}`}</h3>
                  <p className='artistTrans-status'>{`Status: ${payment.status}`}</p>
                  <p className='artistTrans-date'>
                    {moment(payment.createdAt).format('DD MMM YYYY')}
                  </p>
                </div>
                <div className='artistTrans-amountDiv'>
                  <p className='artistTrans-amount'>{`Rs ${(
                    parseInt(payment.amount) * state
                  ).toFixed(2)}/-`}</p>
                </div>
              </div>
            ))}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default AllTransactions;
