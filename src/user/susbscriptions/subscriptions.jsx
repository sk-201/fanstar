import React, { Fragment, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Ban from '../.././assets/register-banner.png';
import Back from '../.././assets/Rectangle 736.png';
import { ReactComponent as Home } from '../.././assets/home-white.svg';
import { ReactComponent as ChatB } from '../.././assets/chat-black.svg';
import { ReactComponent as LockB } from '../.././assets/lock-black.svg';
import { ReactComponent as HomeB } from '../.././assets/home.svg';
import { ReactComponent as Chat } from '../.././assets/chat.svg';
import { ReactComponent as Lock } from '../.././assets/lock.svg';
import './subscriptions.css';
import BottomNav from '../BottomNav/BottomNav';
const Subscription = () => {
  const [home, setHome] = useState(0);
  const [chat, setChat] = useState(0);
  const [lock, setLock] = useState(1);
  const { id, artistName } = useParams();
  const navigate = useNavigate();
  return (
    <Fragment>
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
            <Link
              to={`/artist/${artistName}/${id}/subscribe`}
              style={{ textDecoration: 'none' }}
            >
              <button className='btn-sub'>Subscribe now</button>
            </Link>
          </div>
        </div>
      </div>
      <BottomNav active='subscribe' />
    </Fragment>
  );
};
export default Subscription;
