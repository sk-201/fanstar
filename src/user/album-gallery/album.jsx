import React, { Fragment, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as Clock } from '../.././assets/clock.svg';
import { ReactComponent as Home } from '../.././assets/home-white.svg';
import { ReactComponent as ChatB } from '../.././assets/chat-black.svg';
import { ReactComponent as LockB } from '../.././assets/lock-black.svg';
import { ReactComponent as HomeB } from '../.././assets/home.svg';
import { ReactComponent as Chat } from '../.././assets/chat.svg';
import { ReactComponent as Lock } from '../.././assets/lock.svg';
import API from '../../api';
import { imageUrl } from '../../utils';
import '../landing/landing.css';
import BottomNav from '../BottomNav/BottomNav';
const Album = () => {
  const [home, setHome] = useState(0);
  const [chat, setChat] = useState(0);
  const [lock, setLock] = useState(1);
  const navigate = useNavigate();
  const { id, artistName } = useParams();
  const [seconds, setSeconds] = useState(120);
  const [album, setAlbum] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [timestamp, setTimestamp] = useState('');
  const [startClock, setStartClock] = useState(false);
  const location = useLocation();
  const [albumId, setAlbumId] = useState(location.state);

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('fanstarUserToken')}`,
      },
    };
    API.get(`/api/user/private/getallimages/${id}`, config).then(({ data }) => {
      setAlbum(data);
      // console.log(data);
    });
    if (albumId) {
      // console.log(albumId,"state");
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className='album-mainContainer'>
        <h1 className='container-2-head'>
          My Images{' '}
          <span
            id='see-all'
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigate(`/artist/${artistName}/${id}`);
            }}
          >
            Back
          </span>
        </h1>
        {album.length === 0 ? (
          <h3 className='artistChatlist-loading'>No image</h3>
        ) : (
          <div className='time-cont'>
            {(new Date().getTime() - timestamp) / 1000 <= 120 ? ( //condition
              <div>
                {' '}
                <Clock id='clock-svg' />{' '}
                <span id='timer-clock'> {seconds} sec</span>
                <div className='album-card'>
                  {album.length > 0 &&
                    album.map((data, ind) => {
                      return (
                        <div>
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
                          <p className='imageCaption-paraBottom'>
                            {data.caption}
                          </p>
                        </div>
                      );
                    })}
                  {/* <button onClick={removeAccess}>Remove</button> */}
                </div>
              </div>
            ) : (
              <div>
                <div className='album-card'>
                  {album.length > 0 &&
                    album.map((data, ind) => {
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
                              <p className='displayPrice'>{`Rs. ${data.price}/-`}</p>
                              {data?.url?.split('.')?.pop() === 'jpg' ||
                              data?.url?.split('.')?.pop() === 'jpeg' ||
                              data?.url?.split('.')?.pop() === 'png' ? (
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
                            </div>
                            <p className='imageCaption-paraBottom'>
                              {data.caption}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <BottomNav active='home' />
    </Fragment>
  );
};
export default Album;
