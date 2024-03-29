import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../../api';
const EmployeeOtp = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(60);
  const { phone } = useParams();
  const [code1, setCode1] = useState('');
  const [code2, setCode2] = useState('');
  const [code3, setCode3] = useState('');
  const [code4, setCode4] = useState('');
  const postData = async (e) => {
    e.preventDefault();
    try {
      if (
        code1.trim() &&
        code1.trim().length == 1 &&
        code2.trim() &&
        code2.trim().length == 1 &&
        code3.trim() &&
        code3.trim().length == 1 &&
        code4.trim() &&
        code4.trim().length == 1
      ) {
        const code = code1 + code2 + code3 + code4;
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const { data } = await API.post(
          '/api/employee/public/verify',
          { phone, code },
          config
        );
        localStorage.setItem('fanstarEmployeeToken', data);
        alert('Login Successfull');
        navigate('/employee/income');
      } else {
        alert('Something went wrong Please try again later!');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  const move = (e, prev, curr, next) => {
    var length = document.getElementById(curr).value.length;
    var maxlength = document.getElementById(curr).getAttribute('maxLength');
    if (parseInt(length) === parseInt(maxlength) && next !== '') {
      document.getElementById(next).focus();
    }
    if (e.key === 'Backspace' && prev !== '') {
      document.getElementById(prev).focus();
    }
  };

  return (
    <div className='otp'>
      <h2 className='otp-head'>Enter OTP</h2>
      <form className='otp-num-form'>
        <div className='otp-num'>
          <input
            className='otp-num-inp1'
            type='tel'
            value={code1}
            maxLength='1'
            id='code1'
            onKeyUp={(e) => move(e, '', 'code1', 'code2')}
            onChange={(e) => setCode1(e.target.value)}
          ></input>
          <input
            className='otp-num-inp2'
            type='tel'
            id='code2'
            value={code2}
            maxLength='1'
            onKeyUp={(e) => move(e, 'code1', 'code2', 'code3')}
            onChange={(e) => setCode2(e.target.value)}
          ></input>
          <input
            className='otp-num-inp3'
            type='tel'
            id='code3'
            value={code3}
            maxLength='1'
            onKeyUp={(e) => move(e, 'code2', 'code3', 'code4')}
            onChange={(e) => setCode3(e.target.value)}
          ></input>
          <input
            className='otp-num-inp4'
            type='tel'
            id='code4'
            value={code4}
            maxLength='1'
            onKeyUp={(e) => move(e, 'code3', 'code4', '')}
            onChange={(e) => setCode4(e.target.value)}
          ></input>
        </div>
        <Link to='/resend' style={{ textDecoration: 'none' }}>
          <h6 className='resend-txt'>
            Resend OTP <span className='timer'>{counter}</span>
          </h6>
        </Link>

        <button className='btn' type='submit' onClick={postData}>
          Log In
        </button>
      </form>
    </div>
  );
};
export default EmployeeOtp;
