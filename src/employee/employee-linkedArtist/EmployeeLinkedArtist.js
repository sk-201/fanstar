import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api';
import artistDemo from '../../assets/artistDemo.png';
import { ReactComponent as Home } from '../.././assets/home.svg';
import { ReactComponent as Chat } from '../.././assets/chat.svg';
import { ReactComponent as Profile } from '../.././assets/employeeprofile.svg';
import './EmployeeLinkedArtist.css';

const EmployeeLinkedArtist = () => {
  const navigate = useNavigate();
  const [artistList, setArtistList] = useState([]);
  const [boolVal, setBoolVal] = useState(false);

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
      <div className='icons-tab'>
        <div className='nav'>
          <Home />

          <Chat />

          <Profile />
        </div>
      </div>
    </div>
  );
};

export default EmployeeLinkedArtist;
