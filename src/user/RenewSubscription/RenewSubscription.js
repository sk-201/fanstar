import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import subsImg from '../../assets/register-banner.png';
import closeIcon from '../../assets/closeIcon.svg';
import './RenewSubscription.css';

const RenewSubscription = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className='renewSubs-container'>
      <div className='renewSubs-cardDiv'>
        <button
          className='renewSubs-close'
          onClick={() => navigate(`/artist/${id}`)}
        >
          <img src={closeIcon} alt='close' className='renewSubs-closeIcon' />
        </button>
        <div className='renewSubs-headerDiv'>
          <h3 className='renewSubs-heading'>Subscription expired</h3>
        </div>
        <div className='renewSubs-imgDiv'>
          <img src={subsImg} alt='subscription' className='renewSubs-img' />
        </div>
        <p className='renewSubs-content'>Your subscription has expired</p>
        <button
          className='renewSubs-btn'
          onClick={() => navigate(`/artist/${id}/sub`)}
        >
          Renew your subscription
        </button>
      </div>
    </div>
  );
};

export default RenewSubscription;
