import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api';
import backIcon from '../../assets/backArrow.svg';
import albumCover from '../../assets/demoAlbumCover.png';
import deleteImage from '../../assets/deleteImage.svg';

import './AddAlbum.css';

const initialData = {
  price: '',
  description: '',
  albumName: '',
};

const AddAlbum = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [inputData, setInputData] = useState(initialData);
  const imageInput = useRef(null);
  const navigate = useNavigate();

  const handleOpenSelector = () => {
    imageInput.current.click();
  };

  const handleImageChange = (event) => {
    const fileUploaded = event.target.files;
    setImageFiles([...imageFiles, ...fileUploaded]);
    // console.log(URL.createObjectURL(fileUploaded[0]));
  };

  const handleDeleteImage = (i) => {
    const list = [...imageFiles];
    list.splice(i, 1);
    setImageFiles(list);
  };

  const handleChange = (e) => {
    const { name } = e.target;
    setInputData({ ...inputData, [name]: e.target.value });
  };

  const handleAddAlbum = async () => {
    console.log(imageFiles);
    if (setImageFiles.length === 0) {
      alert('Add images');
    } else {
      let formData = new FormData();
      imageFiles.forEach((image) => {
        formData.append('artistFile', image);
      });
      formData.append('price', inputData.price);
      formData.append('description', inputData.description);
      formData.append('albumName', inputData.albumName);

      try {
        await API.post('/api/artist/private/createalbum', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
          },
        });
        alert('Album added!');
        navigate('/artist/landing');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='addAlbum-container'>
      <div className='addAlbum-headerDiv'>
        <button
          className='addAlbum-backBtn'
          onClick={() => navigate('/artist/landing')}
        >
          <img src={backIcon} alt='back' className='addAlbum-backIcon' />
        </button>
        <h3 className='addAlbum-heading'>ADD ALBUM</h3>
      </div>
      <div className='addAlbum-imageSection'>
        {imageFiles.length > 0 ? (
          <div className='addAlbum-initialList'>
            {imageFiles.map((image, i) => (
              <div className='addAlubm-initialImgDiv' key={i}>
                <img
                  src={URL.createObjectURL(imageFiles[i])}
                  className='addAlbum-initialImg'
                />
                <button
                  className='addAlbum-deleteImage'
                  onClick={() => handleDeleteImage(i)}
                >
                  <img
                    src={deleteImage}
                    alt='remove'
                    className='addAblum-deleteIcon'
                  />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <img
            src={albumCover}
            alt='cover-image'
            className='addAlbum-coverImage'
          />
        )}

        <button
          className='addAlbum-uploadImage'
          type='button'
          onClick={handleOpenSelector}
        >
          Upload Image
        </button>
        <input
          type='file'
          multiple
          accept='image/*'
          ref={imageInput}
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>
      <div className='addAlbum-detailSection'>
        <div className='addAlbum-inputDiv'>
          <label className='addAlbum-label'>Album name</label>
          <input
            type='text'
            className='addAlbum-inputField'
            placeholder='typing...'
            name='albumName'
            value={inputData.albumName}
            onChange={handleChange}
          />
        </div>
        <div className='addAlbum-inputDiv'>
          <label className='addAlbum-label'>Total amount</label>
          <input
            type='text'
            className='addAlbum-inputField'
            placeholder='Rs'
            name='price'
            value={inputData.price}
            onChange={handleChange}
          />
        </div>
        <div className='addAlbum-inputDiv'>
          <label className='addAlbum-label'>Album Description</label>
          <input
            type='text'
            className='addAlbum-inputField'
            placeholder='typing...'
            name='description'
            value={inputData.description}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='addAlbum-btnDiv'>
        <button className='addAlbum-btn' onClick={handleAddAlbum}>
          Add Album
        </button>
      </div>
    </div>
  );
};

export default AddAlbum;
