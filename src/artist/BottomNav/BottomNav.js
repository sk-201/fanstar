import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api';
import home from '../../assets/home.png';
import activeBottom from '../../assets/activeBottom.svg';
import chat from '../../assets/chat.png';
// import booking from '../../assets/booking.png';
import profileIcon from '../.././assets/Ellipse 66.svg';
import fadeProfile from '../.././assets/opep.svg';
// import subscribe from '../../assets/subscribe.png';

import './BottomNav.css';

const BottomNav = (props) => {
  const { active } = props;
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className='artistBottomNav-container'>
      <div className='artistBottomNav-home' onClick={() => navigate(`/income`)}>
        <img src={home} alt='home' className='artistBottomNav-icon' />
        {active === 'home' && (
          <img
            src={activeBottom}
            alt='active'
            className='artistBottomNav-Activeicon'
          />
        )}
      </div>
      <div className='artistBottomNav-home' onClick={() => navigate(`/chat`)}>
        <img src={chat} alt='chat' className='artistBottomNav-icon' />
        {active === 'chat' && (
          <img
            src={activeBottom}
            alt='active'
            className='artistBottomNav-Activeicon'
          />
        )}
      </div>
      {/**<div
        className='artistBottomNav-home'
        onClick={() => navigate(`/artist/${id}/user/bookings`)}
      >
        <img src={booking} alt='booking' className='artistBottomNav-icon' />
        {active === 'booking' && (
          <img
            src={activeBottom}
            alt='active'
            className='artistBottomNav-Activeicon'
          />
        )}
      </div> */}
      <div
        className='artistBottomNav-home'
        onClick={() => navigate(`/artist/landing`)}
      >
        <img
          src={active === 'profile' ? profileIcon : fadeProfile}
          alt='profile'
          className='artistBottomNav-icon'
        />
        {active === 'profile' && (
          <img
            src={activeBottom}
            alt='active'
            className='artistBottomNav-Activeicon'
          />
        )}
      </div>
    </div>
  );
};

export default BottomNav;
