import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import API from '../../api';
const ArtistOtp = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(60);
  const { phone } = useParams();
  const [code1, setCode1] = useState('');
  const [code2, setCode2] = useState('');
  const [code3, setCode3] = useState('');
  const [code4, setCode4] = useState('');

  const resendOtp = async () => {
    try {
      await API.post(
        '/api/artist/public/generateotp',
        { phone },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert('OTP sent');
      // navigate(`/artist/otp/${phone}`);
    } catch (error) {
      console.log(error);
    }
  };

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
          '/api/artist/public/verify',
          { phone, code },
          config
        );
        console.log(data);
        localStorage.setItem('fanstarToken', data);
        alert('Login Successfull');
        navigate(`/income`);
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
            id='code1'
            type='tel'
            value={code1}
            maxLength='1'
            onKeyUp={(e) => move(e, '', 'code1', 'code2')}
            onChange={(e) => setCode1(e.target.value)}
          ></input>
          <input
            className='otp-num-inp2'
            id='code2'
            type='tel'
            value={code2}
            maxLength='1'
            onKeyUp={(e) => move(e, 'code1', 'code2', 'code3')}
            onChange={(e) => setCode2(e.target.value)}
          ></input>
          <input
            className='otp-num-inp3'
            id='code3'
            type='tel'
            value={code3}
            maxLength='1'
            onKeyUp={(e) => move(e, 'code2', 'code3', 'code4')}
            onChange={(e) => setCode3(e.target.value)}
          ></input>
          <input
            className='otp-num-inp4'
            id='code4'
            type='tel'
            value={code4}
            maxLength='1'
            onKeyUp={(e) => move(e, 'code3', 'code4', '')}
            onChange={(e) => setCode4(e.target.value)}
          ></input>
        </div>
        <h6 className='resend-txt' onClick={resendOtp}>
          Resend OTP <span className='timer'>{counter}</span>
        </h6>

        <button className='btn' type='submit' onClick={postData}>
          Log In
        </button>
      </form>
    </div>
  );
};
export default ArtistOtp;
