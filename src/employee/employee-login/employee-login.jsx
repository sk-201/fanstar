import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api';
import fanstar_logo from '../../assets/fanstar_logo.svg';
import LoadingPage from '../../Loader/LoadingPage';
import '../../user/login/login.css';

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const postData = async () => {
    try {
      if (phone.trim() && phone.trim().length == 10) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        setLoading(true);
        await API.post('/api/employee/public/generateotp', { phone }, config);
        setLoading(false);
        alert('OTP sent');
        navigate(`/employee/otp/${phone}`);
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
      console.log(error.response.data?.error);
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
        <input
          className='input-no'
          type='tel'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
export default EmployeeLogin;
