import React, { Fragment, useEffect, useState } from 'react';
import Img1 from '../.././assets/Banner.png';
import 'swiper/swiper.min.css';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import SwiperCore, { Pagination } from 'swiper';

import API from '../../api';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as Wallet } from '../.././assets/wallet.svg';
import { ReactComponent as Bell } from '../.././assets/bell.svg';
import { ReactComponent as User } from '../.././assets/userlogin.svg';
import { ReactComponent as Clock } from '../.././assets/clock.svg';
import { setTheme, imageUrl, addToHome } from '../../utils';
import './landing.css';
import BottomNav from '../BottomNav/BottomNav';

SwiperCore.use([Pagination]);
const ArtistPage = () => {
  const navigate = useNavigate();
  const { id, artistName } = useParams();
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
  // var addBtn = document.getElementById('addToScreen-user');
  // var deferredPrompt;

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('fanstarUserToken')}`,
      },
    };
    API.get(`/api/user/private/getartist/${id}`, config).then(({ data }) => {
      // console.log(.split(' ').join('-'));
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

  const removeAccess = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('fanstarUserToken')}`,
      },
    };
    try {
      await API.put(
        '/api/user/private/removeimageaccess',
        { imageId: albumId },
        config
      );

      navigate(`/artist/${artistName}/${id}`, { state: '' });
      // setStartClock(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // const addToHome = () => {
  //   window.addEventListener('beforeinstallprompt', (e) => {
  //     e.preventDefault();
  //     deferredPrompt = e;
  //     console.log(e);
  //   });

  //   const btnInstallApp = document.getElementById('addToScreen-user');

  //   if (btnInstallApp && deferredPrompt) {
  //     btnInstallApp.addEventListener('click', (e) => {
  //       deferredPrompt.prompt();
  //       console.log(deferredPrompt);
  //       deferredPrompt.userChoice.then((choiceResult) => {
  //         if (choiceResult.outcome === 'accepted') {
  //           console.log('user accepted A2HS prompt');
  //         } else {
  //           console.log('user dismissed A2HS prompt');
  //         }
  //         deferredPrompt = null;
  //       });
  //     });
  //   }
  // };

  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    var addBtn = document.getElementById('addToScreen-user');
    console.log(addBtn);
    deferredPrompt = e;
    if (accepted == 0) {
      addBtn.show();
    }
  });

  var accepted = 0;
  function addToHome() {
    // AppInstallClick("shilindhraaa");
    accepted = 1;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        // AppInstalled("shilindhraaa");
        console.log('added');
      } else {
      }
    });
  }

  window.addEventListener('appinstalled', (evt) => {
    console.log('a2hs installed');
  });

  return (
    <Fragment>
      <div className='user-landing'>
        <div className='img-header'>
          <img className='img-1' src={Img1} alt='banner-pic' />

          {localStorage.getItem('fanstarUserToken') ? (
            <Link to={`/artist/${artistName}/${id}/wallet`}>
              <Wallet className='wallet-icon' />
            </Link>
          ) : (
            <div
              onClick={() =>
                navigate('/login', {
                  state: { artistid: id, artistName: artistName },
                })
              }
            >
              <User className='wallet-icon' />
              <text id='login-text-land'>Login</text>
            </div>
          )}
          <button
            className='addToHome-btn'
            id='addToScreen-user'
            onClick={addToHome}
          >
            Install
          </button>
          <Link to={`/artist/${artistName}/${id}/albumlist`}>
            <Bell className='bell-icon'> </Bell>
          </Link>
          <h1 className='img-1-heading'>Hi I'm {name}</h1>
        </div>
        <div className='container-1'>
          <div className='container-1-1'>
            <img className='img-2' src={profilePhoto} alt='banner-pic' />
            <h1 className='img-2-heading'>{bio}</h1>
          </div>
          {/**<button className='btn-chat'>Chat now @ Rs 2000/-</button> */}
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
                            navigate(
                              `/artist/${artistName}/${id}/user/service/${data._id}`
                            );
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
                navigate(`/artist/${artistName}/${id}/user/imagelist`, {
                  state: albumId,
                });
              }}
            >
              See All
            </span>
          </h1>
          <div className='time-cont'>
            {(new Date().getTime() - timestamp) / 1000 <= 120 ? ( //condition
              <div>
                {' '}
                <div className='album-card'>
                  {allImages.length > 0 &&
                    allImages.map((data, ind) => {
                      return (
                        <div>
                          {data.accessedBy.length > 0 && (
                            <Fragment>
                              <Clock id='clock-svg' />{' '}
                              <span id='timer-clock'> {seconds} sec</span>
                            </Fragment>
                          )}
                          <div className='album-card-1' key={ind}>
                            {data.url.split('.').pop() === 'jpg' ||
                            data.url.split('.').pop() === 'jpeg' ||
                            data.url.split('.').pop() === 'png' ? (
                              <img
                                className='album-card-img'
                                src={`${imageUrl}/${data.url}`}
                                style={{
                                  webkitFilter: `${
                                    data.accessedBy.length > 0
                                      ? 'blur(0px)'
                                      : 'blur(20px)'
                                  }`,
                                  filter: `${
                                    data.accessedBy.length > 0
                                      ? 'blur(0px)'
                                      : 'blur(20px)'
                                  }`,
                                }}
                              />
                            ) : (
                              <video
                                className='album-card-img'
                                controls
                                style={{
                                  webkitFilter: `${
                                    data.accessedBy.length > 0
                                      ? 'blur(0px)'
                                      : 'blur(20px)'
                                  }`,
                                  filter: `${
                                    data.accessedBy.length > 0
                                      ? 'blur(0px)'
                                      : 'blur(20px)'
                                  }`,
                                }}
                              >
                                <source
                                  src={`${imageUrl}/${data.url}`}
                                  type='video/mp4'
                                />
                              </video>
                            )}
                          </div>
                          {
                            <p className='imageCaption-paraBottom'>
                              {data.caption}
                            </p>
                          }
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
                                    `/artist/${artistName}/${id}/user/image/${data._id}`
                                  );
                                }}
                              >
                                {' '}
                                Unlock now
                              </button>
                              {data.url.split('.').pop() === 'jpg' ||
                              data.url.split('.').pop() === 'jpeg' ||
                              data.url.split('.').pop() === 'png' ? (
                                <img
                                  className='album-card-img'
                                  src={`${imageUrl}/${data.url}`}
                                  style={{
                                    webkitFilter: 'blur(20px)',
                                    filter: 'blur(20px)',
                                  }}
                                />
                              ) : (
                                <video
                                  className='album-card-img'
                                  controls='false'
                                  style={{
                                    webkitFilter: 'blur(20px)',
                                    filter: 'blur(20px)',
                                  }}
                                >
                                  <source
                                    src={`${imageUrl}/${data.url}`}
                                    type='video/mp4'
                                  />
                                </video>
                              )}
                              {/**data.accessedBy.length > 0 && (
                                <p className='imageCaption-para'>
                                  {data.caption}
                                </p>
                              ) */}
                            </div>
                            {
                              <p className='imageCaption-paraBottom'>
                                {data.caption}
                              </p>
                            }
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
