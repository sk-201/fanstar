import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api';
import home from '../../assets/home.png';
import activeBottom from '../../assets/activeBottom.svg';
import chat from '../../assets/chat.png';
import profileIcon from '../.././assets/Ellipse 66.svg';
import fadeProfile from '../.././assets/opep.svg';

import './BottomNav.css';

const BottomNav = (props) => {
  const { active } = props;
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className='employeeBottom-container'>
      <div
        className='employeeBottom-home'
        onClick={() => navigate(`/employee/income`)}
      >
        <img src={home} alt='home' className='employeeBottom-icon' />
        {active === 'home' && (
          <img
            src={activeBottom}
            alt='active'
            className='employeeBottom-Activeicon'
          />
        )}
      </div>
      <div
        className='employeeBottom-home'
        onClick={() => navigate(`/employee/myArtists`)}
      >
        <img src={chat} alt='artist' className='employeeBottom-icon' />
        {active === 'artists' && (
          <img
            src={activeBottom}
            alt='active'
            className='employeeBottom-Activeicon'
          />
        )}
      </div>
      <div
        className='employeeBottom-home'
        onClick={() => navigate(`/employee/profile`)}
      >
        <img
          src={active === 'profile' ? profileIcon : fadeProfile}
          alt='profile'
          className='employeeBottom-icon'
        />
        {active === 'profile' && (
          <img
            src={activeBottom}
            alt='active'
            className='employeeBottom-Activeicon'
          />
        )}
      </div>
    </div>
  );
};

export default BottomNav;
