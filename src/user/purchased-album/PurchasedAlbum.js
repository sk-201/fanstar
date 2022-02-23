import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../api';
import { imageUrl } from '../../utils';
import backIcon from '../../assets/backArrow.svg';

import './PurchasedAlbum.css';
import ConfirmationScreen from './ConfirmationScreen';

const PurchasedAlbum = () => {
  const navigate = useNavigate();
  const { id, albumId, artistName } = useParams();
  const [albumImages, setAlbumImages] = useState([]);
  const [albumName, setAlbumName] = useState('');
  const [boolVal, setBoolVal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);

  const fetchAlbumImages = async () => {
    try {
      const { data } = await API.get(`/api/user/private/getalbum/${albumId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('fanstarUserToken')}`,
        },
      });
      // console.log(data);
      setAlbumName(data.albumName);
      setAlbumImages(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchAlbumImages();
      setBoolVal(true);
    }
  }, [boolVal, id]);

  return (
    <div className='purchased-container'>
      <div className='purchased-headerDiv'>
        <div className='purchased-headerLeft'>
          <button
            className='purchased-btn purchased-backBtn'
            onClick={() => navigate(`/artist/${artistName}/${id}/albumlist`)}
          >
            <img src={backIcon} alt='back' className='purchased-backIcon' />
          </button>
          <h3 className='purchased-pageTitle'>{albumName}</h3>
        </div>
      </div>
      <div className='purchased-imageList'>
        {loading ? (
          <h3 className='artistChatlist-loading'>Loading...</h3>
        ) : (
          <Fragment>
            {albumImages.length === 0 ? (
              <h3 className='artistChatlist-loading'>No image</h3>
            ) : (
              <Fragment>
                {albumImages.images.map((image) => (
                  <div
                    className='purchased-singleDiv'
                    key={image}
                    onClick={() => setSelectedImg(`${imageUrl}/${image}`)}
                  >
                    <img
                      src={`${imageUrl}/${image}`}
                      alt='artist'
                      className='purchased-Img'
                    />
                  </div>
                ))}
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
      {selectedImg && (
        <ConfirmationScreen
          close={() => setSelectedImg(null)}
          selectedImg={selectedImg}
        />
      )}
    </div>
  );
};

export default PurchasedAlbum;
