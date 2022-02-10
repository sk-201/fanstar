import React, { useEffect, useState } from 'react';
import API from '../../api';
import Razorpay_Key from '../../rzp';
import './balance .css';
const WalletBalance = () => {
  const [balance, setBalance] = useState('');

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
      },
    };
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
    const orderUrl = `${API_URL}order/100000`;
    const response = await API.get(orderUrl, config);
    const { data } = response;
    console.log('App -> razorPayPaymentHandler -> data', data);
    console.log('response', response);

    const options = {
      key: Razorpay_Key,
      name: '',
      description: 'Buy Service',
      order_id: data.id,
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const url = `${API_URL}capture/${paymentId}`;
          const captureResponse = await API.post(
            url,
            { amount: '100000' },
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

  return (
    <div className='balance'>
      <div className='balance-screen'>
        <h1 id='bal-sc-head'>
          My Balance <span id='curr'>INR</span>
        </h1>

        <text id='bal-sc-bal'>Rs {balance}.00</text>
      </div>
      <div className='bal-recharge'>
        <p
          style={{ textDecoration: 'none', cursor: 'pointer' }}
          id='bal-re'
          onClick={razorPayPaymentHandler}
        >
          Recharge your Wallet
        </p>
        <span className='bal-re-subhead'>Min recharge 100/-</span>
      </div>
    </div>
  );
};
export default WalletBalance;
