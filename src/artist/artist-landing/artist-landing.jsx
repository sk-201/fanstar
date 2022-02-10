import React, { useEffect, useState, Fragment } from 'react';
import API from '../../api';
import Img1 from '../.././assets/Banner.png';
import Img2 from '../.././assets/2-div-img.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../user/landing/landing.css';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import SwiperCore, { Pagination } from 'swiper';
import { ReactComponent as Home } from '../.././assets/home-white.svg';
import { ReactComponent as ChatB } from '../.././assets/chat-black.svg';
import { ReactComponent as LockB } from '../.././assets/Ellipse 66.svg';
import { ReactComponent as HomeB } from '../.././assets/home.svg';
import { ReactComponent as Chat } from '../.././assets/chat.svg';
import { ReactComponent as Lock } from '../.././assets/opep.svg';
import editIcon from '../../assets/edit-icon.svg';
import plusIcon from '../../assets/plusicon.svg';
import { setTheme } from '../../utils';
import BottomNav from '../BottomNav/BottomNav';

const ArtistLanding = () => {
  const { token = null } = useParams();
  const [services, setServices] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [artistDetails, setArtistDetails] = useState({});
  const [home, setHome] = useState(0);
  const [chat, setChat] = useState(0);
  const [lock, setLock] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('fanstarToken')) {
      if (token) {
        window.localStorage.setItem('fanstarToken', token);
        navigate('/artist/landing');
      } else {
        return navigate('/artist/login');
      }
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
      },
    };

    API.get('/api/artist/private/ownservices', config)
      .then(({ data }) => {
        setServices(data);
      })
      .catch((error) => console.log(error));

    API.get('/api/artist/private/getownfiles', config)
      .then(({ data }) => {
        setImageList(data);
      })
      .catch((error) => console.log(error));

    API.get('/api/artist/private/getownprofile', config)
      .then(({ data }) => {
        window.localStorage.setItem('color', data.theme);
        setTheme(data.theme);
        console.log(data);
        setArtistDetails(data);
      })
      .catch((error) => console.log(error));
  }, []);

  SwiperCore.use([Pagination]);
  return (
    <Fragment>
      <div className='container'>
        <div className='img-header'>
          <img className='img-1' src={Img1} alt='banner-pic' />
          <h1 className='img-1-heading'>
            {Object.keys(artistDetails).length > 0
              ? `Hi I'm ${artistDetails.username}`
              : ''}
            <span id='serv-edit-txt' style={{ marginLeft: '10%' }}>
              Edit
            </span>
            <img
              src={editIcon}
              alt='edit'
              id='edit-icon'
              style={{ marginRight: '-6rem' }}
              onClick={() => {
                navigate('/edit');
              }}
            />
          </h1>
        </div>
        <div className='container-1'>
          <div className='container-1-1'>
            <img className='img-2' src={Img2} alt='banner-pic' />
            <h1 className='img-2-heading'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hendrerit
              ut massa metus.Lorem ip
            </h1>
          </div>
          <Link to='/register' style={{ textDecoration: 'none' }}>
            <button className='btn-chat'>Chat now @ Rs 2000/-</button>
          </Link>
        </div>
        <div className='container-2'>
          <div className='heading-btnDiv'>
            <h1 className='myImage-head'>My Services </h1>
            <button
              className='add-myImage'
              onClick={() => {
                navigate(`/addservice`);
              }}
            >
              Add <span className='addImage-icon'>+</span>
            </button>
          </div>

          <div className='card'>
            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              className='mySwiper'
            >
              {services.length > 0 &&
                services.map((data) => {
                  return (
                    <div>
                      <SwiperSlide>
                        <div
                          className='card-2'
                          onClick={() => {
                            navigate(`/service`);
                          }}
                        >
                          {' '}
                          <text id='service-txt-landing'>
                            {data.serviceName}
                          </text>
                        </div>
                      </SwiperSlide>
                    </div>
                  );
                })}
            </Swiper>
          </div>
        </div>
        <div className='container-2'>
          <div className='heading-btnDiv'>
            <h1 className='myImage-head'>My Images </h1>
            <button
              className='add-myImage'
              onClick={() => {
                navigate(`/add`);
              }}
            >
              Add <span className='addImage-icon'>+</span>
            </button>
          </div>
          <div className='image-containerDiv'>
            {imageList.slice(0, 3).map((image) => (
              <div className='myImageDiv'>
                <img
                  src={`https://fanstar.s3.us-east-2.amazonaws.com/${image.fileUrl}`}
                  alt='myImage'
                  className='myImage'
                />
              </div>
            ))}
            <div className='seeMore-btnDiv'>
              <button
                className='seeMore-btn'
                onClick={() => navigate('/myimage')}
              >
                See more
              </button>
            </div>
          </div>
        </div>
      </div>
      <BottomNav active='profile' />
    </Fragment>
  );
};
export default ArtistLanding;
