import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api';
import './EmployeeLinkedArtist.css';
import BottomNav from '../BottomNav/BottomNav';
import LoadingPage from '../../Loader/LoadingPage';

const EmployeeLinkedArtist = () => {
  const navigate = useNavigate();
  const [artistList, setArtistList] = useState([]);
  const [boolVal, setBoolVal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchArtistList = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/api/employee/private/getownartists', {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(
            'fanstarEmployeeToken'
          )}`,
        },
      });
      setLoading(false);
      setArtistList(data);
    } catch (error) {
      setLoading(false);
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
      <BottomNav active='artists' />
      {loading && <LoadingPage />}
    </div>
  );
};

export default EmployeeLinkedArtist;
