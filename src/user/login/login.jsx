import React, { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import API from '../../api';
import './login.css';
import Logo from '../.././assets/Ellipse 58.png';
const Login = () => {
  const navigate = useNavigate();
  const location=useLocation();
  const [phone, setPhone] = useState('');
  const postData = async () => {
    try {
      if (phone.trim() && phone.trim().length == 10) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        await API.post('/api/user/public/generateotp', { phone }, config);
        alert('OTP sent');
        navigate(`/otp/${phone}`,{state:location.state});
      } else {
        alert('Mobile no is not correct!');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='login-main'>
      <div className='img-container'>
        <img className='logo' src={Logo} alt='fanstar-logo' />
        <h4 className='logo-sub-head'>Fanstar logo</h4>
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
    </div>
  );
};
export default Login;
