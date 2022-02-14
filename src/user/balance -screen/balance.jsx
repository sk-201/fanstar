import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Razorpay_Key from '../../rzp';
import API from '../../api';
import backIcon from '../../assets/backArrow.svg';

import './balance.css';

const Balance = () => {
  const { state } = useLocation();
  const { artistId, serviceId } = useParams();
  const { username, email, phone, insta } = state;
  const [servicename, setServiceName] = useState('');
  const [serviceprice, setServicePrice] = useState('');
  const [balance, setBalance] = useState('');
  const [openRecharge, setOpenRecharge] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
      },
    };
    API.get(`/api/user/private/getaservice/${serviceId}`, config).then(
      ({ data }) => {
        setServiceName(data.serviceName);
        setServicePrice(data.amount);
        console.log(data);
      }
    );
    API.get(`/api/user/private/getowndetails`, config)
      .then(({ data }) => {
        setBalance(data.balance);
      })
      .catch((error) => console.log(error));
  }, []);

  const razorPayPaymentHandler = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
      },
    };
    const API_URL = `/api/user/private/`;
    const orderUrl = `${API_URL}order/${rechargeAmount}`;
    const response = await API.get(orderUrl, config);
    const { data } = response;
    console.log('App -> razorPayPaymentHandler -> data', data);
    console.log('response', response);

    const options = {
      key: Razorpay_Key,
      name: { username },
      description: 'Buy Service',
      order_id: data.id,
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const url = `${API_URL}capture/${paymentId}`;
          const captureResponse = await API.post(
            url,
            { amount: rechargeAmount },
            config
          );
          const successObj = JSON.parse(captureResponse.data);
          const captured = successObj.captured;
          console.log('App -> razorPayPaymentHandler -> captured', successObj);
          if (captured) {
            console.log('success');
          }
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: '#686CFD',
      },
    };
    const rzp1 = new window.Razorpay(options);
    // rzp1.createPayment(options);
    rzp1.open();
  };

  const buyService = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
        },
      };

      await API.put(
        '/api/user/private/buyservice',
        { serviceId, username, email, phone, insta },
        config
      );
      alert('Thank you for buying my service!!');
      navigate(`/artist/${artistId}`);
    } catch (error) {
      alert('Not Enough Balance');
      console.log(error);
    }
  };

  const handleProceed = () => {
    if (parseInt(rechargeAmount) >= 100) {
      razorPayPaymentHandler();
    } else {
      alert('Minimum allowed recharge amount is Rs.100/-');
    }
  };

  return (
    <div className='balance'>
      <div className='balance-backBtnDiv'>
        <button
          className='balance-backBtn'
          onClick={() => navigate(`/artist/${artistId}`)}
        >
          <img className='balance-backIcon' src={backIcon} alt='back' />
        </button>
      </div>
      <div className='balance-screen'>
        <h1 id='bal-sc-head'>
          My Balance <span id='curr'>INR</span>
        </h1>

        <text id='bal-sc-bal'>Rs {balance}.00</text>
      </div>
      <div className='bal-recharge'>
        {openRecharge ? (
          <div className='balance-rechargeDiv'>
            <label className='balance-rechargeLabel'>Recharge amount</label>
            <input
              type='number'
              className='balance-rechargeInp'
              placeholder='Ex. 500'
              min='1'
              value={rechargeAmount}
              onChange={(e) => setRechargeAmount(e.target.value)}
            />
            <span className='bal-re-subhead'>Min recharge 100/-</span>
            <button className='balance-rechargeBtn' onClick={handleProceed}>
              Proceed
            </button>
          </div>
        ) : (
          <p
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            id='bal-re'
            onClick={() => setOpenRecharge(true)}
          >
            Recharge your Wallet
          </p>
        )}
        {!openRecharge && (
          <span className='bal-re-subhead'>Min recharge 100/-</span>
        )}
      </div>
      <div className='prod-details'>
        <h1 id='prod-type'>Product Type :</h1>
        <span id='pers-ser'>Personalised Service</span>
        <span id='i-promote'>{servicename}</span>
      </div>
      <div className='amt-detail'>
        <h1 id='tot-amt'>Total Amount</h1>
        <span id='incl'>(inclusive of all charges)</span>
        <span id='price'>Rs {serviceprice}/-</span>
        <button className='btn-pay' onClick={buyService}>
          Pay with Wallet
        </button>
      </div>
    </div>
  );
};
export default Balance;
