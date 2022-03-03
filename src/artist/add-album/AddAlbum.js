import React, { useState, useRef } from 'react';
import Resizer from 'react-image-file-resizer';
import { useNavigate } from 'react-router-dom';
import API from '../../api';
import backIcon from '../../assets/backArrow.svg';
import albumCover from '../../assets/demoAlbumCover.png';
import deleteImage from '../../assets/deleteImage.svg';
import LoadingPage from '../../Loader/LoadingPage';

import './AddAlbum.css';

const initialData = {
  price: '',
  description: 'Album',
  albumName: 'Album',
};

const AddAlbum = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [inputData, setInputData] = useState(initialData);
  const imageInput = useRef(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  // var count = 0,
  //   totalFiles = 0;
  // const [counter, setCounter] = useState(0);

  const navigate = useNavigate();

  const handleOpenSelector = () => {
    imageInput.current.click();
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        'JPEG',
        70,
        0,
        (uri) => {
          resolve(uri);
        },
        'blob',
        200,
        200
      );
    });

  const handleImageChange = (event) => {
    const fileUploaded = event.target.files;
    const keys = Object.keys(fileUploaded);
    let imageArray = [];
    let index = 0;
    setLoading(true);
    keys.forEach(async (i) => {
      const fileName = fileUploaded[i].name;
      const fileType = fileUploaded[i].type;
      const image = await resizeFile(fileUploaded[i]);
      index += 1;
      const newfile = new File([image], fileName, {
        type: fileType,
        lastModified: Date.now(),
      }); //output image as a file }, mime, quality);
      imageArray.push(newfile);
      if (index === Object.keys(fileUploaded).length) {
        // console.log(imageArray);
        setImageFiles([...imageFiles, ...imageArray]);
        setLoading(false);
      }
    });

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
    // console.log(imageFiles);
    if (imageFiles.length === 0) {
      alert('Please add some photos');
    } else {
      let formData = new FormData();
      // imageFiles.forEach((image) => {
      //   // console.log(image);
      //   // const compressImage = await resizeFile(image);
      //   // console.log(compressImage);
      //   formData.append('artistFile', image);
      // });
      formData.append('price', inputData.price);
      formData.append('description', inputData.description);
      formData.append('albumName', inputData.albumName);

      if (inputData.price !== '') {
        try {
          setLoading(true);
          const { data } = await API.post(
            '/api/artist/private/createalbum',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
              },
            }
          );
          console.log(data);
          setTotalFiles(imageFiles.length);
          let tempTotalFiles = imageFiles.length;
          let tempCount = 0;

          imageFiles.forEach(async (image) => {
            const fileData = new FormData();
            fileData.append('artistFile', image);

            try {
              await API.put(
                `/api/artist/private/updatealbum/${data.albumId}`,
                fileData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem(
                      'fanstarToken'
                    )}`,
                  },
                }
              );
              setCount(count + 1);
              tempCount += 1;
              // console.log(count);
              if (tempCount === tempTotalFiles) {
                setLoading(false);
                alert('Album added!');
                navigate('/artist/landing');
              }
            } catch (error) {
              console.log(error);
            }
          });
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      } else {
        alert('Please add album price');
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
        <button
          className='addAlbum-btn'
          onClick={handleAddAlbum}
          disabled={loading}
        >
          Add Album
        </button>
      </div>
      {loading && <LoadingPage />}
      {/* {loading && (
        <p
          style={{
            position: 'absolute',
            top: '50%',
            left: '36%',
            zIndex: '30',
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '18px',
            color: '#000000',
          }}
        >{`${count} of ${totalFiles} uploaded`}</p>
      )} */}
    </div>
  );
};

export default AddAlbum;
