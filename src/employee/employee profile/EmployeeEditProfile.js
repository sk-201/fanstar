import React, { useState } from 'react';
import backTick from '../../assets/backTick.png';
import demoProfile from '../../assets/demoProfile.png';
import editImageIcon from '../../assets/editImageIcon.png';
import './employee-profile.css';

const EmployeeEditProfile = (props) => {
  const { profileInfo, setIsEdit } = props;
  const [profile, setProfile] = useState(profileInfo);
  return (
    <div className='editProfile-container'>
      <div className='editProfile-headerDiv'>
        <div className='editProfile-pageTitleDiv'>
          <img
            src={backTick}
            alt='back'
            className='editProfile-backTick'
            onClick={() => setIsEdit(false)}
          />
          <h3 className='editProfile-pageTitle'>Edit Profile</h3>
        </div>
        <div className='editProfile-btn'>
          <button className='editProfile-saveBtn'>Save</button>
        </div>
      </div>
      <div className='editProfile-imageSection'>
        <div className='editProfile-helloDiv'>
          <h3 className='editProfile-helloUser'>{`Hello, ${profile.name}`}</h3>
        </div>
        <div className='editProfile-imageDiv'>
          <img
            src={demoProfile}
            alt='profile-img'
            className='editProfile-image'
          />
          <div className='editProfile-editIconDiv'>
            <img
              src={editImageIcon}
              alt='edit'
              className='editProfile-editIcon'
            />
          </div>
        </div>
      </div>
      <div className='profileInfo-section'>
        <div className='inputField-div'>
          <input type='text' value={profile.name} className='inputField' />
          <label className='inputField-label giveMargin'>
            Enter your full name
          </label>
        </div>
        <div className='inputField-div'>
          {/**<input type='text' value={profile.gender} className='inputField' /> */}
          <select className='select-inputField'>
            <option value='Male' selected={profile.gender === 'Male'}>
              Male
            </option>
            <option value='Female' selected={profile.gender === 'Female'}>
              Female
            </option>
            <option value='Other' selected={profile.gender === 'Other'}>
              Other
            </option>
          </select>
          <label className='inputField-label giveMargin'>
            Select your Gender
          </label>
        </div>
        <div className='inputField-div'>
          <input type='text' value={profile.email} className='inputField' />
          <label className='inputField-label giveMargin'>
            Enter your E-mail
          </label>
        </div>
        <div className='inputField-div'>
          <input type='text' value={profile.phone} className='inputField' />
          <label className='inputField-label giveMargin'>
            Enter your phone number
          </label>
        </div>
      </div>
    </div>
  );
};

export default EmployeeEditProfile;
