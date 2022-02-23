import React, { Fragment, useState, useEffect } from 'react';
import API from '../../api';
import { useParams, useNavigate } from 'react-router-dom';
import Ban from '../.././assets/register-banner.png';
import Back from '../.././assets/Rectangle 736.png';
import BottomNav from '../BottomNav/BottomNav';
import './subscriptions.css';
import { imageUrl } from '../../utils';
const Subscribe = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [insta, setInsta] = useState('');
  const [albumDetails, setAlbumDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [boolVal, setBoolVal] = useState(false);
  const { id, albumId, artistName } = useParams();

  const navigate = useNavigate();

  const fetchDetails = async (albumId) => {
    if (localStorage.getItem('fanstarUserToken')) {
      try {
        const { data } = await API.get(
          `/api/user/private/getalbum/${albumId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem(
                'fanstarUserToken'
              )}`,
            },
          }
        );
        setAlbumDetails(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      alert('Please login to subscribe!');
      // navigate('/login', {
      //   state: { artistid: id, artistName: artistName },
      // });
      navigate(`/artist/${artistName}/${id}`);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchDetails(albumId);
      setBoolVal(true);
    }
  }, [boolVal, albumId]);

  return (
    <Fragment>
      <div className='subscription-main'>
        {loading ? (
          <h3 className='artistChatlist-loading'>Loading...</h3>
        ) : (
          <Fragment>
            <img className='back-img' src={Back} alt='background-img' />
            <div className='subscription-container'>
              <h1 className='sub-head'>Subscriptions</h1>
              <div className='subscription-main-2'>
                <div className='img-container'>
                  {' '}
                  <img
                    id='ban-img'
                    src={`${imageUrl}/${albumDetails?.images?.[0]}`}
                    alt='banner-img'
                  />{' '}
                </div>

                <h1 id='sub-main-con'>{albumDetails?.description}</h1>
                {/**<select name='plans' className='choose-plan'>
                  <option value='1month'>1 month membership @ 599/-</option>
                  <option value='plan2'>Plan 2</option>
                  <option value='plan3'>Plan 3</option>
                </select> */}
                <input
                  className='inp-sub'
                  type='text'
                  // placeholder='Name'
                  disabled
                  value={`5 minutes membership @ ${albumDetails?.price}/-`}
                  // onChange={(e) => setName(e.target.value)}
                />
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
                  type='text'
                  placeholder='Instagram handle'
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
                      navigate(
                        `/artist/${artistName}/${id}/subscribe/payment`,
                        {
                          state: {
                            name,
                            email,
                            insta,
                            albumId: albumId,
                            price: albumDetails.price,
                          },
                        }
                      );
                    }
                  }}
                >
                  Pay
                </button>
              </div>
            </div>
          </Fragment>
        )}
      </div>
      <BottomNav active='subscribe' />
    </Fragment>
  );
};
export default Subscribe;
