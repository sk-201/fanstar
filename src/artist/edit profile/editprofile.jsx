import React, { useState, useEffect, Fragment } from 'react';
import Banner from '../../assets/register-banner.png';
import { useNavigate } from 'react-router-dom';
import API from '../../api';
import { setTheme } from '../../utils';
import { ReactComponent as Cross } from '../../assets/cross.svg';
// import { ReactComponent as Blue } from '../../assets/blue.svg';
// import { ReactComponent as Green } from '../../assets/green.svg';
// import { ReactComponent as Red } from '../../assets/red.svg';
// import { ReactComponent as Yellow } from '../../assets/yellow.svg';
import './edit.css';

const Edit = () => {
  const navigate = useNavigate();
  const [baseImage, setBaseImage] = useState(Banner);
  const [baseCoverImage, setBaseCoverImage] = useState(Banner);
  const [Name, setName] = useState('');
  const [Bio, setBio] = useState('');
  const [artistData, setArtistData] = useState({});
  const [boolVal, setBoolVal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [switchToCover, setSwitchToCover] = useState(false);

  const fetchArtistDetail = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/api/artist/private/getownprofile', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
        },
      });
      console.log(data);
      setArtistData(data);
      setName(data.username);
      setBio(data.bio ? data.bio : '');
      setBaseImage(data.profilePhoto);
      setBaseCoverImage(data.coverPhoto);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchArtistDetail();
      setBoolVal(true);
    }
  }, [boolVal]);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };

  const uploadCoverImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseCoverImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const updateData = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
        },
      };
      await API.put(
        '/api/artist/private/updateprofile',
        {
          username: Name,
          profilePhoto: baseImage,
          bio: Bio,
          coverPhoto: baseCoverImage,
        },
        config
      );
      setLoading(false);
      alert('Profile Updated');
      navigate('/artist/landing');
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleChangeTheme = async (color) => {
    try {
      await API.put(
        '/api/artist/private/changetheme',
        {
          theme: color,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
          },
        }
      );
      window.localStorage.setItem('color', color);
      setTheme(color);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='edit-profile'>
      {loading ? (
        <h3 className='artistChatlist-loading' style={{ color: '#fff' }}>
          Loading...
        </h3>
      ) : (
        <div className='edit-container'>
          <div className='editProfile-header'>
            <div className='editProfile-headerLeft'>
              <Cross
                id='cross-icon'
                onClick={() => {
                  navigate('/artist/landing');
                }}
              />
              <span id='edit-txt'>Edit profile</span>
            </div>
            <div className='editProfile-headerRight'>
              <span
                className='editProfile-switchBtn'
                onClick={() => setSwitchToCover(!switchToCover)}
              >
                {switchToCover ? 'switch to profile' : 'switch to cover'}
              </span>
            </div>
          </div>
          {switchToCover ? (
            <Fragment>
              <img id='img-edit' src={baseCoverImage} />
              <label htmlFor='chng-pp' id='chng-pp-1'>
                Change cover picture
              </label>
              <input
                id='chng-pp'
                type='file'
                onChange={(e) => {
                  uploadCoverImage(e);
                }}
                style={{ display: 'none' }}
              />
            </Fragment>
          ) : (
            <Fragment>
              <img id='img-edit' src={baseImage} />
              <label htmlFor='chng-pp' id='chng-pp-1'>
                Change profile picture
              </label>
              <input
                id='chng-pp'
                type='file'
                onChange={(e) => {
                  uploadImage(e);
                }}
                style={{ display: 'none' }}
              />

              <input
                type='text'
                className='inp-edit'
                placeholder='Name'
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type='text'
                className='inp-edit'
                placeholder='Bio'
                value={Bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </Fragment>
          )}
          <h4 id='select-theme'>Select theme for app</h4>
          <h6 id='select-theme-subhead'>Select any one</h6>
          <div className='theme-iconsDiv'>
            <div
              className='theme-btn theme-black'
              onClick={() => handleChangeTheme('black')}
            ></div>
            <div
              className='theme-btn theme-creame'
              onClick={() => handleChangeTheme('creame')}
            ></div>
            <div
              className='theme-btn theme-pink'
              onClick={() => handleChangeTheme('pink')}
            ></div>
            <div
              className='theme-btn theme-blue'
              onClick={() => handleChangeTheme('blue')}
            ></div>
          </div>
          <button id='btn-update' onClick={updateData}>
            Update
          </button>
        </div>
      )}
    </div>
  );
};
export default Edit;
