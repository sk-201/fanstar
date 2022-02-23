import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationScreen from './ConfirmationScreen';
import backArrow from '../../assets/backArrow.svg';
import Image from '../../assets/myimg.png';
import closeWhite from '../../assets/closeWhite.svg';
import { imageUrl } from '../../utils';
import API from '../../api';
import './my-images.css';

const MyImage = () => {
  const [imageList, setImageList] = useState([]);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [boolVal, setBoolVal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const fetchImages = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/api/artist/private/getallownimages', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
        },
      });
      setLoading(false);
      setImageList(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchImages();
      setBoolVal(true);
    }
  }, [boolVal]);

  return (
    <div className='my-image'>
      {/* { <BackArrow id='bck-arrw' onClick={() => navigate('/artist/landing')} />
      <span id='my-service-text'>My Images</span>} */}
      <div className='albumList-headerDiv decreaseWidth'>
        <div className='albumList-headerLeft'>
          <button
            className='albumList-backBtn'
            onClick={() => navigate(`/artist/landing`)}
          >
            <img src={backArrow} alt='back' className='albumList-backIcon' />
          </button>
          <h3 className='albumList-title'>My Images</h3>
        </div>
        <div className='albumList-headerRight'>
          <button
            className='add-myImage'
            onClick={() => {
              navigate(`/add`);
            }}
          >
            Add <span className='addImage-icon'>+</span>
          </button>
        </div>
      </div>
      <div className='my-img-cont'>
        {loading ? (
          <h3 className='myImage-loading'>Loading...</h3>
        ) : (
          <Fragment>
            {imageList.length === 0 ? (
              <h3 className='myImage-loading'>No image</h3>
            ) : (
              <Fragment>
                {imageList.map((image) => (
                  <div className='myImage-box'>
                    <img src={`${imageUrl}/${image.url}`} id='myimg' />
                    <h2 id='unlock-price-txt'>Unlocking price</h2>
                    <h3 id='unlock-price'>{`Rs ${image.price}/-`}</h3>
                    <p id='unlock-price-subtext'>{image.caption}</p>
                    <button
                      className='myImage-btn myImage-delete'
                      onClick={() => {
                        setUrl(image.url);
                        setShowConfirm(true);
                      }}
                    >
                      <img
                        src={closeWhite}
                        alt='delete'
                        className='myImage-deleteIcon'
                      />
                    </button>
                  </div>
                ))}
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
      {showConfirm && (
        <ConfirmationScreen
          close={() => setShowConfirm(false)}
          refresh={() => setBoolVal(false)}
          url={url}
        />
      )}
    </div>
  );
};
export default MyImage;
