import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api';
import artistDemo from '../../assets/artistDemo.png';
import { ReactComponent as Home } from '../.././assets/home-white.svg';
import { ReactComponent as ChatB } from '../.././assets/chat-black.svg';
import { ReactComponent as LockB } from '../.././assets/Ellipse 66.svg';
import { ReactComponent as HomeB } from '../.././assets/home.svg';
import { ReactComponent as Chat } from '../.././assets/chat.svg';
import { ReactComponent as Lock } from '../.././assets/opep.svg';

import './EmployeeLinkedArtist.css';

const EmployeeLinkedArtist = () => {
  const navigate = useNavigate();
  const [artistList, setArtistList] = useState([]);
  const [boolVal, setBoolVal] = useState(false);
  const [home, setHome] = useState(0);
  const [chat, setChat] = useState(1);
  const [lock, setLock] = useState(0);

  const fetchArtistList = async () => {
    try {
      const { data } = await API.get('/api/employee/private/getownartists', {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(
            'fanstarEmployeeToken'
          )}`,
        },
      });
      setArtistList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchArtistList();
      setBoolVal(true);
    }
  }, [boolVal]);

  return (
    <div className='employeeArtist-container'>
      <div className='linkedArtist-headingDiv'>
        <h3 className='linkedArtist-heading'>My artists</h3>
      </div>
      {artistList.map((artist) => (
        <div
          className='linkedArtist-div'
          key={artist.artistId}
          onClick={() => navigate(`/employee/myArtists/${artist.artistId}`)}
        >
          <div className='linkedArtist-imgDiv'>
            <img
              src={artist.profilePhoto}
              alt='artist'
              className='linked-artistImg'
            />
          </div>
          <div className='linkedArtist-detailDiv'>
            <p className='linkedArtist-name'>{artist.artistName}</p>
            <p
              className={`linkedArtist-orders ${
                artist.pendingOrders > 0 ? 'highlight-orders' : ''
              }`}
            >
              Pending orders: {artist.pendingOrders}
            </p>
          </div>
        </div>
      ))}
     {(() => {
        if (home == 1 && chat == 0 && lock == 0) {
          return (
            <div>
              <div className='icons-tab'>
                <div className='nav'>
                  <HomeB />

                  <Chat
                    onClick={() => {
                      setChat(1);
                      setHome(0);
                      navigate('/employee/myArtists');
                    }}
                  />

                  <Lock
                    onClick={() => {
                      setLock(1);
                      setHome(0);
                      navigate(`/employee/profile`);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        } else if (chat == 1 && home == 0 && lock == 0) {
          return (
            <div>
              <div className='icons-tab'>
                <div className='nav'>
                  <Home
                    onClick={() => {
                      setHome(1);
                      setChat(0);
                      navigate('/employee/income');
                    }}
                  />

                  <ChatB />

                  <Lock
                    onClick={() => {
                      setLock(1);
                      setChat(0);
                      navigate(`/employee/profile`);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        } else if (lock == 1 && chat == 0 && home == 0) {
          return (
            <div>
              <div className='icons-tab'>
                <div className='nav'>
                  <Home
                    onClick={() => {
                      setHome(1);
                      setLock(0);
                      navigate(`/employee/income`);
                    }}
                  />

                  <Chat
                    onClick={() => {
                      setChat(1);
                      setLock(0);
                      navigate('/employee/myArtists');
                    }}
                  />

                  <LockB />
                </div>
              </div>
            </div>
          );
        }
      })()}
    </div>
  );
};

export default EmployeeLinkedArtist;
