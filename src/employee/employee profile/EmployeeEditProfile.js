import API from '../../api';
import React, { useState, useRef } from 'react';
import backTick from '../../assets/backTick.png';
import demoProfile from '../../assets/demoProfile.png';
import editImageIcon from '../../assets/editImageIcon.png';
import './employee-profile.css';

const EmployeeEditProfile = (props) => {
  const { profileInfo, setIsEdit, fetchProfileInfo } = props;
  const [profile, setProfile] = useState(profileInfo);
  const [tempImg, setTempImg] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const imageInput = useRef(null);

  const handleChange = (e) => {
    const { name } = e.target;
    setProfile({ ...profile, [name]: e.target.value });
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

  const handleOpenSelector = () => {
    imageInput.current.click();
  };

  const handleImageChange = async (event) => {
    const fileUploaded = event.target.files[0];
    const link = URL.createObjectURL(fileUploaded);
    const base64 = await convertBase64(fileUploaded);
    setProfile({ ...profile, profilePhoto: base64 });
    setTempImg(link);
    setImageFile(fileUploaded);
  };

  const saveChanges = async () => {
    try {
      await API.put(
        '/api/employee/private/updateprofile',
        {
          username: profile.username,
          email: profile.email,
          gender: profile.gender,
          profilePhoto: profile.profilePhoto,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              'fanstarEmployeeToken'
            )}`,
          },
        }
      );
      fetchProfileInfo();
      alert('Profile updated');
    } catch (err) {
      console.log(err);
    }
  };

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
          <button className='editProfile-saveBtn' onClick={saveChanges}>
            Save
          </button>
        </div>
      </div>
      <div className='editProfile-imageSection'>
        <div className='editProfile-helloDiv'>
          <h3 className='editProfile-helloUser'>{`Hello, ${profileInfo.username}`}</h3>
        </div>
        <div className='editProfile-imageDiv'>
          <img
            src={tempImg ? tempImg : profile.profilePhoto}
            alt='profile-img'
            className='editProfile-image'
          />
          <div className='editProfile-editIconDiv' onClick={handleOpenSelector}>
            <img
              src={editImageIcon}
              alt='edit'
              className='editProfile-editIcon'
            />
            <input
              type='file'
              accept='image/*'
              ref={imageInput}
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>
      </div>
      <div className='profileInfo-section'>
        <div className='inputField-div'>
          <input
            type='text'
            value={profile.username}
            className='inputField'
            name='username'
            onChange={handleChange}
          />
          <label className='inputField-label giveMargin'>
            Enter your full name
          </label>
        </div>
        <div className='inputField-div'>
          {/**<input type='text' value={profile.gender} className='inputField' /> */}
          <select
            className='select-inputField'
            name='gender'
            onChange={handleChange}
          >
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
          <input
            type='text'
            value={profile.email}
            className='inputField'
            name='email'
            onChange={handleChange}
          />
          <label className='inputField-label giveMargin'>
            Enter your E-mail
          </label>
        </div>
        {/**<div className='inputField-div'>
          <input type='text' value={profile.phone} className='inputField' name='phoneNumber' onChange={handleChange}/>
          <label className='inputField-label giveMargin'>
            Enter your phone number
          </label>
        </div> */}
      </div>
    </div>
  );
};

export default EmployeeEditProfile;
