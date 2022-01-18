import React from 'react';
import { Link } from 'react-router-dom';
import Ban from '../.././assets/register-banner.png';
import Back from '../.././assets/Rectangle 736.png';
import './subscriptions.css';
const Subscription = () => {
  return (
    <div className='subscription-main'>
      <img className='back-img' src={Back} alt='background-img' />
      <div className='subscription-container'>
        <h1 className='sub-head'>Subscriptions</h1>
        <div className='subscription-main-2'>
          <div className='img-container'>
            {' '}
            <img id='ban-img' src={Ban} alt='banner-img' />{' '}
          </div>

          <h1 id='sub-main-con'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hendre
          </h1>
          <select name='plans' className='choose-plan'>
            <option value='1month'>1 month membership @ 599/-</option>
            <option value='plan2'>Plan 2</option>
            <option value='plan3'>Plan 3</option>
          </select>
          <Link to='/subscribe' style={{ textDecoration: 'none' }}>
            <button className='btn-sub'>Subscribe now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Subscription;
