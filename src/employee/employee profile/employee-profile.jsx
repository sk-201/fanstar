import React, { Fragment, useState, useEffect } from 'react';
import API from '../../api';
import EmployeeEditProfile from './EmployeeEditProfile';
import { useNavigate } from 'react-router-dom';
import fanstar_logo from '../../assets/fanstar_logo.svg';
import avatar from '../../assets/avatar.png';
import editIcon from '../../assets/editIcon.png';
import './employee-profile.css';
import BottomNav from '../BottomNav/BottomNav';
import LoadingPage from '../../Loader/LoadingPage';

const initialData = {
  username: '',
  gender: 'Male',
  email: '',
  phone: '',
  profilePhoto: '',
};

const EmployeeProfile = () => {
  const [profileInfo, setProfileInfo] = useState(initialData);
  const [isEdit, setIsEdit] = useState(false);
  const [boolVal, setBoolVal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProfileInfo = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/api/employee/private/getownprofile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            'fanstarEmployeeToken'
          )}`,
        },
      });
      setLoading(false);
      // console.log(data);
      setProfileInfo(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchProfileInfo();
      setBoolVal(true);
    }
  }, []);

  return (
    <div className='employee-profile'>
      {!isEdit ? (
        <Fragment>
          <div className='img-cont-inc' style={{ paddingTop: '1rem' }}>
            <span id='fanstar'>Fanstar</span>
          </div>
          <img id='logo-img' src={fanstar_logo} />
          <div className='profile-main-container'>
            <div className='profileImage-section'>
              <div className='profileImg-div'>
                <img
                  src={
                    profileInfo.profilePhoto ? profileInfo.profilePhoto : avatar
                  }
                  alt='profile'
                  className='profileImg'
                />
              </div>
              <div className='editBtnDiv' onClick={() => setIsEdit(true)}>
                <span className='editText'>Edit</span>
                <img src={editIcon} alt='edit' className='editIcon' />
              </div>
            </div>
            <div className='profileInfo-section'>
              <div className='inputField-div'>
                <label className='inputField-label'>Your full name</label>
                <input
                  type='text'
                  value={profileInfo.username}
                  className='inputField'
                  disabled
                />
              </div>
              <div className='inputField-div'>
                <label className='inputField-label'>Your Gender</label>
                <input
                  type='text'
                  value={profileInfo.gender}
                  className='inputField'
                  disabled
                />
              </div>
              <div className='inputField-div'>
                <label className='inputField-label'>Your E-mail</label>
                <input
                  type='text'
                  value={profileInfo.email}
                  className='inputField'
                  disabled
                />
              </div>
              <div className='inputField-div'>
                <label className='inputField-label'>Your phone number</label>
                <input
                  type='text'
                  value={profileInfo.phone}
                  className='inputField'
                  disabled
                />
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <EmployeeEditProfile
          profileInfo={profileInfo}
          setIsEdit={setIsEdit}
          fetchProfileInfo={fetchProfileInfo}
        />
      )}
      <BottomNav active='profile' />
      {loading && <LoadingPage />}
    </div>
  );
};
export default EmployeeProfile;
