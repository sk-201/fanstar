import React, { useState } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';
import backArrow from '../../assets/backArrow.svg';
import './add-image.css';
const AddImage = () => {
  const navigate = useNavigate();
  const [baseImage, setBaseImage] = useState('');
  const [caption, setCaption] = useState('');
  const [price, setPrice] = useState('');
  const [fileStore, setFileStore] = useState('');

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    setFileStore(e.target.files[0]);
    const base64 = await convertBase64(file);
    setBaseImage(base64);
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
  const sendImage = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
        },
      };
      if (caption.trim().length == 0 && price.trim().length() == 0) {
        alert('Caption or Price is empty');
      }
      const data = new FormData();
      data.append('caption', caption);
      data.append('price', price);
      data.append('artistFile', fileStore);
      await API.post('/api/artist/private/uploadfile', data, config);
      alert('Image Uploaded!');
      navigate('/artist/landing');
    } catch (error) {
      alert('Something went wrong!');
      console.log(error);
    }
  };
  return (
    <div className='add-image'>
      <div className='addImage-headerDiv'>
        <div className='addImage-tileDiv'>
          <button
            className='bck-arrwBtn'
            onClick={() => navigate('/artist/landing')}
          >
            <img src={backArrow} alt='back' className='addImage-backIcon' />
          </button>
          <h3 className='addImage-title'>Add Image</h3>
        </div>
        <div className='addImage-postBtnDiv'>
          <button className='addImage-postBtn' onClick={sendImage}>
            Post
          </button>
        </div>
      </div>

      <div className='add-img-cont'>
        <div>
          {baseImage ? (
            <img id='added-img' src={baseImage} />
          ) : (
            <div>
              <input
                type='file'
                onChange={(e) => {
                  uploadImage(e);
                }}
                className='inp-add-img'
              />
            </div>
          )}
        </div>
        <label for='add-caption'> Add Caption</label>
        <input
          id='add-caption'
          type='text'
          className='inp-add-img'
          placeholder='typing...'
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <label for='img-price'> Add Price</label>
        <input
          id='img-price'
          type='text'
          className='inp-add-img'
          placeholder='Rs'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
    </div>
  );
};
export default AddImage;
