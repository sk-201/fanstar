import React from 'react';
import { useNavigate } from 'react-router-dom';
import locationIcon from '../assets/locationIcon.png';
import closeIcon from '../assets/closeIcon.svg';
import './IntroScreen.css';

const LoginOptionScreen = (props) => {
  const { setShowLogin } = props;
  const navigate = useNavigate();
  return (
    <div className='loginOption-container'>
      <div className='loginOption-closeDiv'>
        <img
          src={closeIcon}
          alt='close'
          className='loginOption-closeIcon'
          onClick={() => setShowLogin(false)}
        />
      </div>
      <h3 className='loginOption-title'>Fanstar</h3>
      <div className='loginOption-contentDiv'>
        <div className='loginOption-contentHead'>
          <img src={locationIcon} className='loginOption-icon' alt='welcome' />
          <h3 className='loginOption-heading'>Welcome</h3>
        </div>
        <p className='loginOption-para'>
          Please select what best describes you
        </p>
      </div>
      <div className='loginOption-btnSection'>
        <button
          className='loginOption-artistBtn'
          onClick={() => navigate('/artist/login')}
        >
          I am an Artist
        </button>
        <div className='loginOption-dividerDiv'>
          <span className='divider'></span>
          <span className='divider-content'>OR</span>
          <span className='divider'></span>
        </div>
        <button
          className='loginOption-artistBtn'
          onClick={() => navigate('/employee/login')}
        >
          I am an Employee
        </button>
      </div>
    </div>
  );
};

export default LoginOptionScreen;
