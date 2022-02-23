import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Resizer from 'react-image-file-resizer';
import API from '../../api';
import { imageUrl } from '../../utils';
import ConfirmationScreen from './ConfirmationScreen';
import backIcon from '../../assets/backArrow.svg';
import editIcon from '../../assets/editIcon.svg';
// import artistDemo from '../../assets/Group 33907.png';
import closeWhite from '../../assets/closeWhite.svg';
import dustbin from '../../assets/dustbin.svg';

import './ViewAlbum.css';
import ViewSingleImage from './ViewSingleImage';

const ViewAlbum = () => {
  const imageInput = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [albumImages, setAlbumImages] = useState([]);
  const [albumName, setAlbumName] = useState('');
  const [boolVal, setBoolVal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [type, setType] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

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
      setAlbumName(data.albumName);
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

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        'JPEG',
        60,
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
    // const fileArray = [...fileUploaded];
    const keys = Object.keys(fileUploaded);
    let imageArray = [];
    let index = 0;
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
        handleAddImage(imageArray);
        // setImageFiles([...imageFiles, ...imageArray]);
      }
    });
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
            onClick={() => navigate('/artist/myalbums')}
          >
            <img src={backIcon} alt='back' className='viewAlbum-backIcon' />
          </button>
          <h3 className='viewAlbum-pageTitle'>{albumName}</h3>
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
                  <div
                    className='viewAlbum-singleDiv'
                    key={image}
                    onClick={() => setSelectedImage(`${imageUrl}/${image}`)}
                  >
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
          back={() => navigate('/artist/myalbums')}
          refresh={() => setBoolVal(false)}
        />
      )}
      {selectedImage && (
        <ViewSingleImage
          close={() => setSelectedImage(null)}
          selectedImg={selectedImage}
        />
      )}
    </div>
  );
};

export default ViewAlbum;
