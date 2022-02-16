import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import userIcon from '../../assets/chatuser.svg';
import Logo from '../../assets/Ellipse 58.png';
import chatPriceIcon from '../../assets/chatPriceIcon.svg';
import './chatscreen.css';
import API from '../../api';
import { imageUrl } from '../../utils';
import BottomNav from '../BottomNav/BottomNav';
import ConfirmationScreen from './ConfirmationScreen';

const ChatList = () => {
  const navigate = useNavigate();
  const [artistId, setartistId] = useState('');
  const [artistEmail, setArtistEmail] = useState('');
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
      },
    };
    API.get(`/api/artist/private/getownprofile`, config)
      .then(({ data }) => {
        setartistId(data._id);
        setArtistEmail(data.email);
        API.get(`/api/chat/getallchats/${data._id}`, config)
          .then((res) => {
            // console.log(res.data);
            setChats(res.data);
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
  }, []);

  return (
    <Fragment>
      <div className='chat'>
        <div className='chat-headerContainer'>
          <div className='chat-header-brand'>
            <img className='chat-headerLogo' src={Logo} />
            <h3 className='chat-headTitle'>Fanstar logo</h3>
          </div>
          <div className='chat-headerCharge'>
            {!loading && (
              <button
                className='changePrice-btn'
                onClick={() => setOpenConfirm(true)}
              >
                <img
                  src={chatPriceIcon}
                  alt='chat-price'
                  className='changePrice-icon'
                />
              </button>
            )}
          </div>
        </div>
        <div className='chat-container'>
          {loading ? (
            <h3 className='artistChatlist-loading'>Loading...</h3>
          ) : (
            <Fragment>
              {chats.length === 0 ? (
                <h3 className='artistChatlist-loading'>No history</h3>
              ) : (
                <Fragment>
                  {chats?.map((data) => (
                    <div
                      className='artistChat-chatBox'
                      onClick={() =>
                        navigate('/artist/chat', {
                          state: {
                            userId: artistId,
                            roomId: data.roomId,
                            username: data.username,
                            paymentId: data.paymentId,
                            artistEmail: artistEmail,
                            userEmail: data.email,
                          },
                        })
                      }
                      key={data.roomId}
                    >
                      <div className='artistChatlist-imgDiv'>
                        <img
                          src={userIcon}
                          alt='user-pic'
                          className='artistChatlist-img'
                        />
                      </div>
                      <div className='artistChatlist-contentDiv'>
                        <div className='artistChatlist-userInfo'>
                          <div className='artistChatlist-usernameAndService'>
                            <h4 className='artistChatlist-username'>
                              {data.username ? `${data.username} ` : ''}
                            </h4>
                            <span className='artistChatlist-serviceName'>
                              {data?.serviceName ? data?.serviceName : ''}
                            </span>
                          </div>

                          <p className='artistChatlist-lastmsg'>
                            {data?.lastMessage?.isImage ? (
                              <img
                                src={`${imageUrl}/${data?.lastMessage?.message}`}
                                alt='emoji'
                                width='24px'
                                height='24px'
                                style={{ borderRadius: '8px' }}
                              />
                            ) : data?.lastMessage?.message?.length > 25 ? (
                              `${data?.lastMessage?.message?.substr(0, 25)}...`
                            ) : (
                              data?.lastMessage?.message
                            )}
                          </p>
                        </div>
                        <div className='artistChatlist-chatTime'>
                          <p className='artistChatlist-time'>
                            {data?.lastMessage?.time
                              ? moment(data?.lastMessage?.time).fromNow()
                              : ''}
                          </p>
                        </div>
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
      {openConfirm && (
        <ConfirmationScreen close={() => setOpenConfirm(false)} />
      )}
    </Fragment>
  );
};
export default ChatList;
