import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import LoadingPage from '../../Loader/LoadingPage';
import fanstar_logo from '../../assets/fanstar_logo.svg';
import '../../user/login/login.css';

const ArtistLogin = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const postData = async () => {
    try {
      if (phone.trim()) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        setLoading(true);
        await API.post('/api/artist/public/generateotp', { phone }, config);
        alert('OTP sent');
        setLoading(false);
        navigate(`/artist/otp/${phone}`);
      } else {
        alert('Mobile no is not correct!');
        // console.log(phone);
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
      <Fragment>
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
      </Fragment>
      {loading && <LoadingPage />}
    </div>
  );
};
export default ArtistLogin;
