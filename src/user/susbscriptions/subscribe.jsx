import React, { Fragment, useState } from 'react';
import API from '../../api';
import { useParams, useNavigate } from 'react-router-dom';
import Ban from '../.././assets/register-banner.png';
import Back from '../.././assets/Rectangle 736.png';
import BottomNav from '../BottomNav/BottomNav';
import './subscriptions.css';
const Subscribe = () => {
  const [home, setHome] = useState(0);
  const [chat, setChat] = useState(0);
  const [lock, setLock] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [insta, setInsta] = useState('');
  const { id, albumId } = useParams();
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
            <input
              className='inp-sub'
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className='inp-sub'
              type='email'
              placeholder='Email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className='inp-sub'
              type='tel'
              placeholder='Instagram id'
              value={insta}
              onChange={(e) => setInsta(e.target.value)}
            />
            <button
              className='btn-sub'
              onClick={() => {
                if (
                  name.trim() == '' ||
                  email.trim() == '' ||
                  insta.trim() == ''
                ) {
                  alert('One or more Field is empty!!');
                } else {
                  navigate(`/artist/${id}/subscribe/payment`, {
                    state: { name, email, insta, albumId: albumId },
                  });
                }
              }}
            >
              Pay Rs 500/-
            </button>
          </div>
        </div>
      </div>
      <BottomNav active='subscribe' />
    </Fragment>
  );
};
export default Subscribe;
