import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../api';
import { imageUrl } from '../../utils';
import backIcon from '../../assets/backArrow.svg';
import demoCover from '../../assets/demoCover.png';
import './AlbumList.css';

const AlbumList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [albumList, setAlbumList] = useState([]);
  const [boolVal, setBoolVal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchAlbumList = async () => {
    try {
      const { data } = await API.get(`/api/user/private/getallalbums/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('fanstarUserToken')}`,
        },
      });
      // console.log(data);
      let dataArray = [];
      data.forEach(async (d) => {
        try {
          const response = await API.put(
            `/api/user/private/checkifsubscribed`,
            {
              albumId: d._id,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(
                  'fanstarUserToken'
                )}`,
              },
            }
          );
          dataArray.push({ ...d, subscribed: response.data.isSubscriber });
          // console.log(dataArray.length, 'len', data.length);
          if (dataArray.length === data.length) {
            console.log(dataArray);
            setAlbumList(dataArray);
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      });
      // console.log(dataArray);
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
      <div className='albumList-headerDiv'>
        <button
          className='albumList-backBtn'
          onClick={() => navigate(`/artist/${id}`)}
        >
          <img src={backIcon} alt='back' className='albumList-backIcon' />
        </button>
        <h3 className='albumList-title'>Subscriptions</h3>
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
                  <div className='albumList-albumDiv' key={album._id}>
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
                    <div className='albumList-subsBtnDiv'>
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
                    </div>
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

export default AlbumList;
