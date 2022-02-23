import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../api';
import { imageUrl } from '../../utils';
import backIcon from '../../assets/backArrow.svg';
import demoCover from '../../assets/demoCover.png';
import './MyAlbums.css';

const MyAlbums = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [albumList, setAlbumList] = useState([]);
  const [boolVal, setBoolVal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchAlbumList = async () => {
    try {
      const { data } = await API.get(`/api/artist/private/getallownalbums`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
        },
      });

      // console.log(data);
      setAlbumList(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchAlbumList();
      setBoolVal(true);
    }
  }, [boolVal]);

  // const checkForSubscribe = async (id) => {
  //   try {
  //     const { data } = await API.put(
  //       `/api/user/private/checkifsubscribed`,
  //       {
  //         albumId: id,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${localStorage.getItem('fanstarUserToken')}`,
  //         },
  //       }
  //     );
  //     console.log(data.isSubscriber);
  //     return data.isSubscriber;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className='albumList-container'>
      <div className='albumList-headerDiv '>
        <div className='albumList-headerLeft'>
          <button
            className='albumList-backBtn'
            onClick={() => navigate(`/artist/landing`)}
          >
            <img src={backIcon} alt='back' className='albumList-backIcon' />
          </button>
          <h3 className='albumList-title'>My Albums</h3>
        </div>
        <div className='albumList-headerRight'>
          <button
            className='add-myImage'
            onClick={() => {
              navigate(`/artist/addalbum`);
            }}
          >
            Add <span className='addImage-icon'>+</span>
          </button>
        </div>
      </div>
      <div className='ablumList-listDiv'>
        {loading ? (
          <h3 className='artistChatlist-loading'>Loading...</h3>
        ) : (
          <Fragment>
            {albumList.length === 0 ? (
              <h3 className='artistChatlist-loading'>No album</h3>
            ) : (
              <Fragment>
                {albumList.map((album) => (
                  <div
                    className='albumList-albumDiv'
                    key={album._id}
                    onClick={() => navigate(`/artist/viewalbum/${album._id}`)}
                  >
                    <h3 className='albumList-ablumName'>{album.albumName}</h3>
                    <div className='albumList-coverDiv'>
                      <img
                        src={
                          album.images.length > 0
                            ? `${imageUrl}/${album.images[0]}`
                            : demoCover
                        }
                        alt='cover-image'
                        className='albumList-cover'
                      />
                    </div>
                    <p className='albumList-description'>
                      {album.description ? album.description : ''}
                    </p>
                    {/**<div className='albumList-subsBtnDiv'>
                      <button
                        className='albumList-subsBtn'
                        onClick={() => {
                          if (!album.subscribed) {
                            navigate(`/artist/${id}/subscribe/${album._id}`);
                          } else {
                            navigate(`/artist/${id}/viewalbum/${album._id}`);
                          }
                        }}
                      >
                        {album.subscribed ? 'View' : 'Subscribe'}
                      </button>
                    </div> */}
                  </div>
                ))}
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default MyAlbums;
