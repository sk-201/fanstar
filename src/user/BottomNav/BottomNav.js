import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api';
import home from '../../assets/home.png';
import activeBottom from '../../assets/activeBottom.svg';
import chat from '../../assets/chat.png';
import booking from '../../assets/booking.png';
import subscribe from '../../assets/subscribe.png';

import './BottomNav.css';

const BottomNav = (props) => {
  const { active } = props;
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(location.pathname.includes(`/artist/${id}`));

  const chatHandler = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
        },
      };
      const { data } = await API.get('/api/user/private/getowndetails', config);
      // console.log(data);
      const res = await API.post(
        '/api/chat/createchat',
        { user1: data._id, user2: id },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      navigate(`/artist/${id}/user/chat`, {
        state: { userId: data._id, roomId: res.data, artistId: id },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bottomNav-container'>
      <div className='bottomNav-home' onClick={() => navigate(`/artist/${id}`)}>
        <img src={home} alt='home' className='bottomNav-icon' />
        {active === 'home' && (
          <img
            src={activeBottom}
            alt='active'
            className='bottomNav-Activeicon'
          />
        )}
      </div>
      <div
        className='bottomNav-home'
        onClick={() => navigate(`/artist/${id}/user/chatlist`)}
      >
        <img src={chat} alt='chat' className='bottomNav-icon' />
        {active === 'chat' && (
          <img
            src={activeBottom}
            alt='active'
            className='bottomNav-Activeicon'
          />
        )}
      </div>
      <div
        className='bottomNav-home'
        onClick={() => navigate(`/artist/${id}/user/bookings`)}
      >
        <img src={booking} alt='booking' className='bottomNav-icon' />
        {active === 'booking' && (
          <img
            src={activeBottom}
            alt='active'
            className='bottomNav-Activeicon'
          />
        )}
      </div>
      <div
        className='bottomNav-home'
        onClick={() => navigate(`/artist/${id}/albumlist`)}
      >
        <img src={subscribe} alt='subscribe' className='bottomNav-icon' />
        {active === 'subscribe' && (
          <img
            src={activeBottom}
            alt='active'
            className='bottomNav-Activeicon'
          />
        )}
      </div>
    </div>
  );
};

export default BottomNav;
