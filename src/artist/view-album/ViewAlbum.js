import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../api';
import { imageUrl } from '../../utils';
import ConfirmationScreen from './ConfirmationScreen';
import backIcon from '../../assets/backArrow.svg';
import editIcon from '../../assets/editIcon.svg';
// import artistDemo from '../../assets/Group 33907.png';
import closeWhite from '../../assets/closeWhite.svg';
import dustbin from '../../assets/dustbin.svg';

import './ViewAlbum.css';

const ViewAlbum = () => {
  const imageInput = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [albumImages, setAlbumImages] = useState([]);
  const [boolVal, setBoolVal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [type, setType] = useState('');

  const fetchAlbumImages = async (id) => {
    try {
      const { data } = await API.get(
        `/api/artist/private/getaparticularalbum/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
          },
        }
      );
      // console.log(data);
      setAlbumImages(data.images);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchAlbumImages(id);
      setBoolVal(true);
    }
  }, [boolVal, id]);

  const handleOpenSelector = () => {
    imageInput.current.click();
  };

  const handleImageChange = (event) => {
    const fileUploaded = event.target.files;
    const fileArray = [...fileUploaded];
    // setImageFiles([...imageFiles, ...fileUploaded]);
    handleAddImage(fileArray);
    // console.log(URL.createObjectURL(fileUploaded[0]));
  };

  const handleAddImage = async (files) => {
    // console.log(files);
    if (files.length > 0) {
      setLoading(true);
      let formData = new FormData();
      files.forEach((image) => {
        formData.append('artistFile', image);
      });
      try {
        const { data } = await API.put(
          `/api/artist/private/updatealbum/${id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
            },
          }
        );
        // console.log(data);
        alert('Images added!');
        setLoading(false);
        setBoolVal(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <div className='viewAlbum-container'>
      <div className='viewAlbum-headerDiv'>
        <div className='viewAlbum-headerLeft'>
          <button
            className='viewAlbum-btn viewAlbum-backBtn'
            onClick={() => navigate('/artist/landing')}
          >
            <img src={backIcon} alt='back' className='viewAlbum-backIcon' />
          </button>
          <h3 className='viewAlbum-pageTitle'>Album name</h3>
        </div>
        <div className='viewAlbum-headerRight'>
          <button
            className='viewAlbum-btn viewAblum-editBtn'
            onClick={() => navigate(`/artist/editalbum/${id}`)}
          >
            <span className='viewAlbum-editName'>Edit</span>
            <span className='viewAlbum-iconSpan'>
              <img src={editIcon} alt='edit' className='viewAlbum-editIcon' />
            </span>
          </button>
          <button
            className='viewAlbum-btn viewAblum-deleteBtn'
            onClick={() => {
              setType('album');
              setShowConfirm(true);
            }}
          >
            <span className='viewAlbum-editName'>Delete</span>
            <span className='viewAlbum-iconSpan'>
              <img src={dustbin} alt='edit' className='viewAlbum-deleteIcon' />
            </span>
          </button>
        </div>
      </div>
      <div className='viewAlbum-imageList'>
        {loading ? (
          <h3 className='artistChatlist-loading'>Loading...</h3>
        ) : (
          <Fragment>
            {albumImages.length === 0 ? (
              <h3 className='artistChatlist-loading'>No image</h3>
            ) : (
              <Fragment>
                {albumImages.map((image) => (
                  <div className='viewAlbum-singleDiv' key={image}>
                    <img
                      src={`${imageUrl}/${image}`}
                      alt='artist'
                      className='viewAlbum-Img'
                    />
                    <button
                      className='viewAlbum-btn viewAlbum-delete'
                      onClick={() => {
                        setShowConfirm(true);
                        setFileUrl(image);
                        setType('image');
                      }}
                    >
                      <img
                        src={closeWhite}
                        alt='delete'
                        className='viewAlbum-deleteIcon'
                      />
                    </button>
                  </div>
                ))}
              </Fragment>
            )}
          </Fragment>
        )}
        <button
          className='viewAlbum-btn viewAlbum-addBtn'
          onClick={handleOpenSelector}
        >
          <span className='viewAlbum-iconAddSpan'>+</span>
          <span className='viewAlbum-addSpan'>Add new</span>
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
      {showConfirm && (
        <ConfirmationScreen
          close={() => setShowConfirm(false)}
          id={id}
          type={type}
          fileUrl={fileUrl}
          back={() => navigate('/artist/landing')}
          refresh={() => setBoolVal(false)}
        />
      )}
    </div>
  );
};

export default ViewAlbum;
