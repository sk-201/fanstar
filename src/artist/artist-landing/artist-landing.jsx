import React, { useEffect, useState, Fragment } from 'react';
import API from '../../api';
import jwt_decode from 'jwt-decode';
import Img1 from '../../assets/fanstarAppLogo.jpeg';
import Img2 from '../.././assets/2-div-img.png';
import { useNavigate, useParams } from 'react-router-dom';
import '../../user/landing/landing.css';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import SwiperCore, { Pagination } from 'swiper';
import editIcon from '../../assets/edit-icon.svg';
import { setTheme, imageUrl } from '../../utils';
import BottomNav from '../BottomNav/BottomNav';
import LoadingPage from '../../Loader/LoadingPage';

const ArtistLanding = () => {
  const { token = null } = useParams();
  const [services, setServices] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [albumList, setAlbumList] = useState([]);
  const [artistDetails, setArtistDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let deferredPrompt;
  var btnAdd = document.getElementById('addToScreen');

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    console.log('loading..');
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can add to home screen
    btnAdd.style.display = 'block';
    console.log('loaded');
  });

  const handleInstall = (e) => {
    // hide our user interface that shows our A2HS button
    btnAdd.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  };

  // Check if the app is succesfully installed
  window.addEventListener('appinstalled', (evt) => {
    console.log('a2hs', 'installed');
  });

  useEffect(() => {
    if (!localStorage.getItem('fanstarToken')) {
      if (token) {
        window.localStorage.setItem('fanstarToken', token);
        navigate('/artist/landing');
      } else {
        return navigate('/artist/login');
      }
    } else if (localStorage.getItem('fanstarToken')) {
      // console.log('hello', jwt_decode(localStorage.getItem('fanstarToken')));
      if (token) {
        window.localStorage.setItem('fanstarToken', token);
        navigate('/artist/landing');
      } else if (
        jwt_decode(localStorage.getItem('fanstarToken')).exp <=
        Date.now() / 1000
      ) {
        console.log('hi');
        localStorage.removeItem('fanstarToken');
        return navigate('/artist/login');
      }
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
      },
    };

    setLoading(true);

    API.get('/api/artist/private/ownservices', config)
      .then(({ data }) => {
        setServices(data);
      })
      .catch((error) => console.log(error));

    API.get('/api/artist/private/getallownimages', config)
      .then(({ data }) => {
        setImageList(data);
        // console.log(data);
      })
      .catch((error) => console.log(error));

    API.get('/api/artist/private/getallownalbums', config)
      .then(({ data }) => {
        setAlbumList(data);
        // console.log(data);
      })
      .catch((error) => console.log(error));

    API.get('/api/artist/private/getownprofile', config)
      .then(({ data }) => {
        window.localStorage.setItem('color', data.theme);
        setTheme(data.theme);
        // console.log(data);
        setLoading(false);
        setArtistDetails(data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  SwiperCore.use([Pagination]);

  // const addToHome = () => {
  //   window.addEventListener('beforeinstallprompt', (e) => {
  //     e.preventDefault();
  //     deferredPrompt = e;
  //     console.log(e);
  //   });

  //   const btnInstallApp = document.getElementById('addToScreen');

  //   if (btnInstallApp && deferredPrompt) {
  //     btnInstallApp.addEventListener('click', (e) => {
  //       deferredPrompt.prompt();
  //       console.log(deferredPrompt);
  //       deferredPrompt.userChoice.then((choiceResult) => {
  //         if (choiceResult.outcome === 'accepted') {
  //           console.log('user accepted A2HS prompt');
  //         } else {
  //           console.log('user dismissed A2HS prompt');
  //         }
  //         deferredPrompt = null;
  //       });
  //     });
  //   }
  // };

  // let deferredPrompt;
  // // addBtn.style.display = 'none';

  // // useEffect(() => {

  // // }, []);

  // var accepted = 0;

  // const shortcut = () => {
  //   console.log('clicked');
  //   if (accepted) {
  //     deferredPrompt.prompt();
  //     deferredPrompt.userChoice.then((choiceResult) => {
  //       if (choiceResult.outcome === 'accepted') {
  //         // AppInstalled("shilindhraaa");
  //         console.log('added');
  //       } else {
  //       }
  //     });
  //   }
  // };

  // function addToHome() {
  //   // AppInstallClick("shilindhraaa");
  //   window.addEventListener('beforeinstallprompt', (e) => {
  //     e.preventDefault();
  //     var addBtn = document.getElementById('addToScreen');

  //     // console.log(addBtn);
  //     deferredPrompt = e;
  //     console.log(e);
  //     if (accepted == 0) {
  //       addBtn.style.display = 'block';
  //       accepted = 1;
  //       shortcut();
  //     }
  //   });
  // }

  // window.addEventListener('appinstalled', (evt) => {
  //   console.log('a2hs installed');
  // });

  return (
    <Fragment>
      <div className='container'>
        <div className='img-header'>
          <img
            className='img-1'
            src={artistDetails.coverPhoto ? artistDetails.coverPhoto : Img1}
            alt='banner-pic'
          />
          <button
            className='addToHome-btn'
            id='addToScreen'
            onClick={handleInstall}
          >
            Install
          </button>
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
            <img
              className='img-2'
              src={artistDetails.profilePhoto}
              alt='banner-pic'
            />
            <h1 className='img-2-heading'>{artistDetails.bio}</h1>
          </div>
          {/**<Link to='/register' style={{ textDecoration: 'none' }}>
            <button className='btn-chat'>Chat now @ Rs 2000/-</button>
          </Link> */}
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
            {services.length > 0 ? (
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
                            <div className='serviceText-div alignCenter'>
                              <text id='service-txt-landing'>
                                {data.serviceName}
                              </text>
                              <text
                                id='service-txt-landing'
                                className='service-amount'
                              >
                                {`Rs ${data.amount}/-`}
                              </text>
                            </div>
                          </div>
                        </SwiperSlide>
                      </div>
                    );
                  })}
              </Swiper>
            ) : (
              <h3 className='artistChatlist-loading'>No service</h3>
            )}
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
            {imageList.slice(0, 3).map((image) => {
              if (image.url) {
                return (
                  <Fragment>
                    <div className='myImageDiv'>
                      {image?.url?.split('.')?.pop()?.toLowerCase() === 'jpg' ||
                      image?.url?.split('.')?.pop()?.toLowerCase() === 'jpeg' ||
                      image?.url?.split('.')?.pop()?.toLowerCase() === 'png' ? (
                        <img
                          src={`${imageUrl}/${image.url}`}
                          alt='myImage'
                          className='myImage'
                        />
                      ) : (
                        <video className='myImage' controls>
                          <source
                            src={`${imageUrl}/${image.url}`}
                            type='video/mp4'
                          />
                        </video>
                      )}
                    </div>
                    <p className='imageCaption-paraBottom'>{image.caption}</p>
                  </Fragment>
                );
              }
            })}
            {imageList.length > 0 ? (
              <div className='seeMore-btnDiv'>
                <button
                  className='seeMore-btn'
                  onClick={() => navigate('/myimage')}
                >
                  See more
                </button>
              </div>
            ) : (
              <h3 className='artistChatlist-loading'>No image</h3>
            )}
          </div>
        </div>
        <div className='container-2'>
          <div className='heading-btnDiv'>
            <h1 className='myImage-head'>My Albums </h1>
            <button
              className='add-myImage'
              onClick={() => {
                navigate(`/artist/addalbum`);
              }}
            >
              Add <span className='addImage-icon'>+</span>
            </button>
          </div>
          <div className='image-containerDiv'>
            {/**{imageList.slice(0, 3).map((image) => (
              <div className='myImageDiv'>
                <img
                  src={`https://fanstar.s3.us-east-2.amazonaws.com/${image.fileUrl}`}
                  alt='myImage'
                  className='myImage'
                />
              </div>
            ))}
            {imageList.length > 0 ? (
              <div className='seeMore-btnDiv'>
                <button
                  className='seeMore-btn'
                  onClick={() => navigate('/myimage')}
                >
                  See more
                </button>
              </div>
            ) : (
              <h3 className='artistChatlist-loading'>No ablum</h3>
            )} */}
            {albumList.slice(0, 3).map((album) => (
              <div
                className='artistLanding-ablumDiv'
                key={album._id}
                onClick={() => navigate(`/artist/viewalbum/${album._id}`)}
              >
                <h3 className='artistLanding-ablumName'>{album.albumName}</h3>
                <div className='artistLanding-ablumCover'>
                  <img
                    src={`${imageUrl}/${album?.images?.[0]}`}
                    alt='cover'
                    className='artistLanding-cover'
                  />
                </div>
                <h3 className='artistLanding-numPhoto'>
                  {album.images.length === 1
                    ? `${album.images.length} photo`
                    : `${album.images.length} photos`}
                </h3>
              </div>
            ))}

            {albumList.length > 0 ? (
              <div className='seeMore-btnDiv'>
                <button
                  className='seeMore-btn'
                  onClick={() => navigate('/artist/myalbums')}
                >
                  See more
                </button>
              </div>
            ) : (
              <h3 className='artistChatlist-loading'>No ablum</h3>
            )}
          </div>
        </div>
      </div>
      <BottomNav active='profile' />
      {loading && <LoadingPage />}
    </Fragment>
  );
};
export default ArtistLanding;
