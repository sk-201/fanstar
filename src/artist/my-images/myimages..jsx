import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api';
import { ReactComponent as BackArrow } from '../../assets/backArrow.svg';
import Image from '../../assets/myimg.png';
import './my-images.css';
const MyImage = () => {
  const [imageList, setImageList] = useState([]);
  const [boolVal, setBoolVal] = useState(false);
  const navigate = useNavigate();

  const fetchImages = async () => {
    try {
      const { data } = await API.get('/api/artist/private/getownfiles', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
        },
      });
      console.log(data);
      setImageList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchImages();
    }
  }, [boolVal]);

  return (
    <div className='my-image'>
      <BackArrow id='bck-arrw' onClick={() => navigate('/artist/landing')} />
      <span id='my-service-text'>My Images</span>
      <div className='my-img-cont'>
        {imageList.length === 0 ? (
          <h1 className='myImage-loading'>Loading...</h1>
        ) : (
          <Fragment>
            {imageList.map((image) => (
              <div className='myImage-box'>
                <img
                  src={`https://fanstar.s3.us-east-2.amazonaws.com/${image.fileUrl}`}
                  id='myimg'
                />
                <h2 id='unlock-price-txt'>Unlocking price</h2>
                <h3 id='unlock-price'>{`Rs ${image.price}/-`}</h3>
                <p id='unlock-price-subtext'>{image.caption}</p>
              </div>
            ))}
          </Fragment>
        )}
      </div>
    </div>
  );
};
export default MyImage;
