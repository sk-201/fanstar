import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import API from '../../api';
import fanstar_logo from '../.././assets/fanstar_logo.svg';
import './login.css';
import LoadingPage from '../../Loader/LoadingPage';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  if (!location.state) {
    navigate('/');
  }

  const postData = async () => {
    try {
      if (phone.trim()) {
        setLoading(true);
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        await API.post('/api/user/public/generateotp', { phone }, config);
        setLoading(false);
        alert('OTP sent');
        navigate(`/otp/${phone}`, { state: location.state });
      } else {
        setLoading(false);
        alert('Mobile no is not correct!');
      }
    } catch (error) {
      setLoading(false);
      alert(
        error?.response?.data?.error
          ? error?.response?.data?.error
          : 'Something went wrong'
      );
      console.log(
        error?.response?.data?.error
          ? error?.response?.data?.error
          : 'Something went wrong'
      );
    }
  };
  return (
    <div className='login-main'>
      <div className='img-container'>
        <img
          className='logo logoSizing'
          src={fanstar_logo}
          alt='fanstar-logo'
        />
        <h4 className='logo-sub-head'>Fanstar</h4>
      </div>
      <h2 className='login-heading'>Login </h2>
      <div className='inputs'>
        <PhoneInput
          id={'inputStyle'}
          className='input-phoneno'
          // type='tel'
          defaultCountry='IN'
          value={phone}
          onChange={setPhone}
          placeholder='Enter your phone no'
        />

        <h6 className='msg-no'>Please Enter your phone number</h6>
        <button className='btn-nxt' onClick={postData}>
          Next
        </button>
      </div>
      {loading && <LoadingPage />}
    </div>
  );
};
export default Login;
