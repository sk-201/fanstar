import React, { Fragment, useState, useEffect } from 'react';
import API from '../../api';
import EmployeeEditProfile from './EmployeeEditProfile';
import Logo from '../../assets/Ellipse 58.png';
import { ReactComponent as Home } from '../.././assets/home.svg';
import { ReactComponent as Chat } from '../.././assets/chat.svg';
import { ReactComponent as Profile } from '../.././assets/employeeprofile.svg';
import demoProfile from '../../assets/demoProfile.png';
import editIcon from '../../assets/editIcon.png';
import './employee-profile.css';

const initialData = {
  username: '',
  gender: '',
  email: '',
  phone: '',
  profilePhoto: '',
};

const EmployeeProfile = () => {
  const [profileInfo, setProfileInfo] = useState(initialData);
  const [isEdit, setIsEdit] = useState(false);
  const [boolVal, setBoolVal] = useState(false);

  const fetchProfileInfo = async () => {
    try {
      const { data } = await API.get('/api/employee/private/getownprofile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            'fanstarEmployeeToken'
          )}`,
        },
      });
      // console.log(data);
      setProfileInfo(data);
    } catch (error) {
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
            <span id='fanstar'>Fanstar logo</span>
          </div>
          <img id='logo-img' src={Logo} />
          <div className='profile-main-container'>
            <div className='profileImage-section'>
              <div className='profileImg-div'>
                <img
                  src={
                    profileInfo.profilePhoto
                      ? profileInfo.profilePhoto
                      : demoProfile
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
export default EmployeeProfile;
