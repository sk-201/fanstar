import React, { Fragment, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import userIcon from '../../assets/chatuser.svg';
import Logo from '../../assets/Ellipse 58.png';
import '../../artist/chat/chatscreen.css';
import API from '../../api';
import { imageUrl } from '../../utils';
import BottomNav from '../BottomNav/BottomNav';

const UserChatList = () => {
  const navigate = useNavigate();
  const { id, artistName } = useParams();
  const [userId, setUserId] = useState('');
  const [chats, setChats] = useState([]);
  const [artistDetials, setArtistDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const chatHandler = async (paymentId) => {
    // console.log(paymentId);
    try {
      const res = await API.post(
        '/api/chat/createchat',
        { user1: userId, user2: id, paymentId: paymentId },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      navigate(`/artist/${artistName}/${id}/user/chat`, {
        state: {
          userId: userId,
          roomId: res.data,
          artistId: id,
          paymentId: paymentId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('fanstarUserToken')}`,
      },
    };
    API.get(`/api/user/private/getartist/${id}`, config)
      .then(({ data }) => {
        setArtistDetails(data);
        API.get(`/api/chat/getallchatsofuser`, config)
          .then((res) => {
            // console.log(res.data);
            setChats(res.data.chats);
            setUserId(res.data.ownId);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <Fragment>
      <div className='chat paddingToList'>
        <div className='chat-headerContainer'>
          <img className='chat-headerLogo' src={Logo} alt='logo' />
          <h3 className='chat-headTitle'>Fanstar logo</h3>
        </div>
        <div className='chat-container'>
          {loading ? (
            <h3 className='artistChatlist-loading'>Loading...</h3>
          ) : (
            <Fragment>
              {chats.length === 0 ? (
                <h3 className='artistChatlist-loading'>
                  No History, buy service to proceed
                </h3>
              ) : (
                <Fragment>
                  {chats.map((data) => (
                    <div
                      className='artistChat-chatBox'
                      key={data._id}
                      onClick={() => chatHandler(data.paymentId._id)}
                    >
                      <div className='artistChatlist-imgDiv'>
                        <img
                          src={
                            artistDetials.profilePhoto
                              ? artistDetials.profilePhoto
                              : userIcon
                          }
                          alt='user-pic'
                          className='artistChatlist-img'
                        />
                      </div>
                      <div className='artistChatlist-contentDiv'>
                        <div className='artistChatlist-userInfo'>
                          <div className='artistChatlist-usernameAndService'>
                            <h4 className='artistChatlist-username'>
                              {artistDetials.username
                                ? `${artistDetials.username} `
                                : ''}
                            </h4>
                            <span className='artistChatlist-serviceName'>
                              {data?.paymentId?.serviceName
                                ? data?.paymentId?.serviceName
                                : ''}
                            </span>
                          </div>
                          {data.allMessages.length > 0 && (
                            <p className='artistChatlist-lastmsg'>
                              {data?.allMessages[data?.allMessages?.length - 1]
                                .isImage ? (
                                <img
                                  src={`${imageUrl}/${
                                    data?.allMessages[
                                      data?.allMessages?.length - 1
                                    ].message
                                  }`}
                                  alt='emoji'
                                  width='24px'
                                  height='24px'
                                  style={{ borderRadius: '8px' }}
                                />
                              ) : data?.allMessages[
                                  data?.allMessages?.length - 1
                                ]?.message?.length > 25 ? (
                                `${data?.allMessages[
                                  data?.allMessages?.length - 1
                                ]?.message?.substr(0, 25)}...`
                              ) : (
                                data?.allMessages[data?.allMessages?.length - 1]
                                  ?.message
                              )}
                            </p>
                          )}
                        </div>
                        {data.allMessages.length > 0 && (
                          <div className='artistChatlist-chatTime'>
                            <p className='artistChatlist-time'>
                              {moment(
                                data?.allMessages[data?.allMessages?.length - 1]
                                  ?.time
                              ).fromNow()}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </Fragment>
              )}
            </Fragment>
          )}
        </div>
      </div>

      <BottomNav active='chat' />
    </Fragment>
  );
};
export default UserChatList;
