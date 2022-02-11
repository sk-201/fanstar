import React, { useState, useRef } from 'react';
import backIcon from '../../assets/backArrow.svg';
import albumCover from '../../assets/demoAlbumCover.png';
import deleteImage from '../../assets/deleteImage.svg';

import './AddAlbum.css';

const AddAlbum = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const imageInput = useRef(null);

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

  return (
    <div className='addAlbum-container'>
      <div className='addAlbum-headerDiv'>
        <button className='addAlbum-backBtn'>
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
          />
        </div>
        <div className='addAlbum-inputDiv'>
          <label className='addAlbum-label'>Total amount</label>
          <input type='text' className='addAlbum-inputField' placeholder='Rs' />
        </div>
        <div className='addAlbum-inputDiv'>
          <label className='addAlbum-label'>Album Description</label>
          <input
            type='text'
            className='addAlbum-inputField'
            placeholder='typing...'
          />
        </div>
      </div>
      <div className='addAlbum-btnDiv'>
        <button className='addAlbum-btn'>Add Album</button>
      </div>
    </div>
  );
};

export default AddAlbum;
