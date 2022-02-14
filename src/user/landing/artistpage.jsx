import React, { Fragment, useEffect, useState } from 'react';
import Img1 from '../.././assets/Banner.png';
import Img2 from '../.././assets/2-div-img.png';
import AlbumImg1 from '../.././assets/Group 33907.png';
import AlbumImg2 from '../.././assets/Group 33906.png';
import AlbumImg3 from '../.././assets/Group 33945.png';

import 'swiper/swiper.min.css';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import SwiperCore, { Pagination } from 'swiper';

import API from '../../api';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as Wallet } from '../.././assets/wallet.svg';
import { ReactComponent as Bell } from '../.././assets/bell.svg';
import { ReactComponent as User } from '../.././assets/userlogin.svg';
import { ReactComponent as Clock } from '../.././assets/clock.svg';
import { setTheme } from '../../utils';
import './landing.css';
import BottomNav from '../BottomNav/BottomNav';

SwiperCore.use([Pagination]);
const ArtistPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [seconds, setSeconds] = useState(120);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [services, setServices] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [timestamp, setTimestamp] = useState('');
  const [startClock, setStartClock] = useState(false);
  const location = useLocation();
  const [albumId, setAlbumId] = useState(location.state);

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
      },
    };
    API.get(`/api/user/private/getartist/${id}`, config).then(({ data }) => {
      window.localStorage.setItem('color', data.theme);
      setTheme(data.theme);
      setName(data.username);
      setProfilePhoto(data.profilePhoto);
      setBio(data.bio);
    });
    API.get(`/api/user/public/getservices/${id}`, config).then(({ data }) => {
      setServices(data);
    });
    API.get(`/api/user/private/getallimages/${id}`, config).then(({ data }) => {
      setAllImages(data);
      // console.log(data);
    });
    if (albumId) {
      // console.log(albumId, 'state');
      API.get(`/api/user/private/getimagetimestamp/${albumId}`, config).then(
        (res) => {
          setTimestamp(new Date().getTime());
          setStartClock(true);
          // console.log((new Date().getTime()-new Date(res.data).getTime())/1000);
          // API.put('/api/user/private/removealbumaccess',{albumId:state},config);
          //   console.log(new Date());
          //  console.log(new Date(res.data))
        }
      );
    }
  }, []);

  useEffect(() => {
    if (seconds > 0 && startClock) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else if (seconds <= 0 && startClock) {
      removeAccess();
      setStartClock(false);
    }
  }, [seconds, startClock]);

  // const chatHandler = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
  //       },
  //     };
  //     const { data } = await API.get('/api/user/private/getowndetails', config);

  //     const res = await API.post(
  //       '/api/chat/createchat',
  //       { user1: data._id, user2: id },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );
  //     navigate('/user/chat', {
  //       state: { userId: data._id, roomId: res.data, id: id },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const removeAccess = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
      },
    };
    try {
      await API.put('/api/user/private/removealbumaccess', { albumId }, config);

      navigate(`/artist/${id}`, { state: '' });
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(location,"location");
  return (
    <Fragment>
      <div className='user-landing'>
        <div className='img-header'>
          <img className='img-1' src={Img1} alt='banner-pic' />

          {localStorage.getItem('fanstarToken') ? (
            <Link to={`/artist/${id}/wallet`}>
              <Wallet className='wallet-icon' />
            </Link>
          ) : (
            <div
              onClick={() => navigate('/login', { state: { artistid: id } })}
            >
              <User className='wallet-icon' />
              <text id='login-text-land'>Login</text>
            </div>
          )}
          <Link to={`/artist/${id}/sub`}>
            <Bell className='bell-icon'> </Bell>
          </Link>
          <h1 className='img-1-heading'>Hi I'm {name}</h1>
        </div>
        <div className='container-1'>
          <div className='container-1-1'>
            <img className='img-2' src={profilePhoto} alt='banner-pic' />
            <h1 className='img-2-heading'>{bio}</h1>
          </div>
          <button className='btn-chat'>Chat now @ Rs 2000/-</button>
        </div>
        <div className='container-2'>
          <h1 className='container-2-head'>Lets connect</h1>

          <div>
            <div className='card'>
              {/* <div className='card-1'></div> */}
              <Swiper
                pagination={{
                  dynamicBullets: true,
                }}
                className='mySwiper'
              >
                {services.length > 0 &&
                  services.map((data) => {
                    return (
                      <SwiperSlide>
                        <div
                          className='card-2'
                          onClick={() => {
                            navigate(`/artist/${id}/user/service/${data._id}`);
                          }}
                        >
                          {' '}
                          <text id='service-txt-landing'>
                            {data.serviceName}
                          </text>
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>

              {/* <div className='card-3'></div> */}
            </div>
          </div>
        </div>
        <div className='container-2'>
          <h1 className='container-2-head'>
            My Images{' '}
            <span
              id='see-all'
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigate(`/artist/${id}/user/imagelist`, { state: albumId });
              }}
            >
              See All
            </span>
          </h1>
          <div className='time-cont'>
            {(new Date().getTime() - timestamp) / 1000 <= 120 ? ( //condition
              <div>
                {' '}
                <Clock id='clock-svg' />{' '}
                <span id='timer-clock'> {seconds} sec</span>
                <div className='album-card'>
                  {allImages.length > 0 &&
                    allImages.slice(0, 3).map((data, ind) => {
                      return (
                        <div>
                          <div className='album-card-1' key={ind}>
                            <img
                              className='album-card-img'
                              src={`https://fanstar.s3.us-east-2.amazonaws.com/${data.url}`}
                              style={{
                                webkitFilter: `${
                                  data.accessedBy.length > 0
                                    ? 'blur(0px)'
                                    : 'blur(10px)'
                                }`,
                                filter: `${
                                  data.accessedBy.length > 0
                                    ? 'blur(0px)'
                                    : 'blur(10px)'
                                }`,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  {/* <button onClick={removeAccess}>Remove</button> */}
                </div>
              </div>
            ) : (
              <div>
                <div className='album-card'>
                  {allImages.length > 0 &&
                    allImages.slice(0, 3).map((data, ind) => {
                      return (
                        <div>
                          <div className='album-card-1' key={ind}>
                            <div id='album-img-btn'>
                              <button
                                id='unlock-btn'
                                onClick={() => {
                                  navigate(
                                    `/artist/${id}/user/image/${data._id}`
                                  );
                                }}
                              >
                                {' '}
                                Unlock now
                              </button>
                              <img
                                className='album-card-img'
                                src={`https://fanstar.s3.us-east-2.amazonaws.com/${data.url}`}
                                style={{
                                  webkitFilter: 'blur(10px)',
                                  filter: 'blur(10px)',
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* <button onClick={removeAccess}>Remove</button> */}
          </div>

          {/* <div className='album-card-2'><img className="album-card-img" src={AlbumImg2}/></div>
            <div className='album-card-3'><img className="album-card-img" src={AlbumImg3}/></div> */}
        </div>
      </div>
      <BottomNav active='home' />
    </Fragment>
  );
};
export default ArtistPage;
