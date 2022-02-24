import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api';
import Ban from '../.././assets/register-banner.png';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [insta, setInsta] = useState('');
  const [servicename, setServiceName] = useState('');
  const [serviceprice, setServicePrice] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const { serviceId, artistId, artistName } = useParams();
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  // this.razorPayHandler = this.razorPayHandler(this);

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('fanstarUserToken')}`,
      },
    };

    API.get(`/api/user/private/getaservice/${serviceId}`, config)
      .then(({ data }) => {
        setServiceName(data.serviceName);
        setServicePrice(data.amount);
        setServiceDesc(data.description);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const findLoction = async (long, lat) => {
    try {
      const { data } = await axios.get(
        `https://us1.locationiq.com/v1/reverse.php?key=pk.449ce430f077a7d656d39b1d66709709&lat=${lat}&lon=${long}&format=json`
      );
      setLocation(
        `${data?.address?.state ? `${data?.address?.state},` : ''} ${
          data?.address?.country ? data?.address?.country : ''
        }`
      );
      console.log(
        `${data?.address?.state ? `${data?.address?.state},` : ''} ${
          data?.address?.country ? data?.address?.country : ''
        }`
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        findLoction(position.coords.longitude, position.coords.latitude);
        // setLatitude(position.coords.latitude);
        // setLongitude(position.coords.longitude);
      });
    } else {
      console.log('Not Availaible');
    }
  }, []);

  // async razorPayPaymentHandler() {
  //     const API_URL = `/api/user/private/`
  //     const orderUrl = `${API_URL}order`;
  //     const response = await API.get(orderUrl);
  //     const { data } = response;
  //     console.log("App -> razorPayPaymentHandler -> data", data)
  //     console.log("response", response)

  //     const options = {
  //        key: '<--Razorpay key id-->',
  //       name: "avdojo",
  //       description: "avodojo",
  //       order_id: data.id,
  //       handler: async (response) => {
  //         try {
  //          const paymentId = response.razorpay_payment_id;
  //          const url = `${API_URL}capture/${paymentId}`;
  //          const captureResponse = await API.post(url, {})
  //          const successObj = JSON.parse(captureResponse.data)
  //          const captured = successObj.captured;
  //          console.log("App -> razorPayPaymentHandler -> captured", successObj)
  //          if(captured){
  //              console.log('success')
  //          }

  //         } catch (err) {
  //           console.log(err);
  //         }
  //       },
  //       theme: {
  //         color: "#686CFD",
  //       },
  //     };
  //     const rzp1 = new window.Razorpay(options);
  //     // rzp1.createPayment(options);
  //     rzp1.open();
  //   }

  return (
    <div className='Register'>
      <div className='img-banner'>
        <img src={Ban} id='ban-img-id' alt='banner-img' />
      </div>
      <div>
        <h1>Product Type</h1>
        <h2 className='pers-text'>Personalised Services</h2>
        <h6 className='pers-text-h'> {servicename}</h6>
        <h1>Final Amount:</h1>
        <h6>Rs {serviceprice}/-</h6>
      </div>
      <div className='form-input'>
        <input
          type='text'
          placeholder='Enter name'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='email'
          placeholder='Enter email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='text'
          placeholder='Enter phone number'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type='text'
          placeholder='@Instagram Handle'
          value={insta}
          onChange={(e) => setInsta(e.target.value)}
        />
      </div>
      <button
        className='btn-pay'
        onClick={() => {
          if (
            username.trim() == '' ||
            email.trim() == '' ||
            phone.trim() == '' ||
            insta.trim() == ''
          ) {
            alert('One or more Field is empty!!');
          } else {
            navigate(
              `/artist/${artistName}/${artistId}/user/service/${serviceId}/payment`,
              {
                state: { username, email, phone, insta, location },
              }
            );
          }
        }}
      >
        Pay Rs {serviceprice}/-
      </button>

      <text>
        <span>Description : </span> {serviceDesc}{' '}
        {/**<span>Read more </span> */}
      </text>
    </div>
  );
};

export default Register;
