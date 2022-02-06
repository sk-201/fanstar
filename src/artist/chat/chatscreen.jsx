import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { ReactComponent as User } from '../../assets/chatuser.svg';
import userIcon from '../../assets/chatuser.svg';
import Logo from '../../assets/Ellipse 58.png';
import { ReactComponent as Home } from '../.././assets/home-white.svg';
import { ReactComponent as ChatB } from '../.././assets/chat-black.svg';
import { ReactComponent as LockB } from '../.././assets/Ellipse 66.svg';
import { ReactComponent as HomeB } from '../.././assets/home.svg';
import { ReactComponent as Chat } from '../.././assets/chat.svg';
import { ReactComponent as Lock } from '../.././assets/opep.svg';
import './chatscreen.css';
import API from '../../api';

const ChatList = () => {
  const navigate = useNavigate();
  const [artistId, setartistId] = useState('');
  const [chats, setChats] = useState([]);
  const [home, setHome] = useState(0);
  const [chat, setChat] = useState(1);
  const [lock, setLock] = useState(0);
  const [loading, setLoading] = useState(true);

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
        API.get(`/api/chat/getallchats/${data._id}`, config)
          .then((res) => {
            setChats(res.data);
            // console.log(res.data);
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
    <div className='chat'>
      <div className='chat-headerContainer'>
        <img className='chat-headerLogo' src={Logo} />
        <h3 className='chat-headTitle'>Fanstar logo</h3>
      </div>
      <div className='chat-container'>
        {chats.length <= 0 ? (
          <h3 className='artistChatlist-loading'>Loading...</h3>
        ) : (
          <Fragment>
            {chats.map((data) => (
              <div
                className='artistChat-chatBox'
                onClick={() =>
                  navigate('/artist/chat', {
                    state: { userId: artistId, roomId: data.roomId },
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
                    <h4 className='artistChatlist-username'>
                      {data.userPhone}
                    </h4>
                    <p className='artistChatlist-lastmsg'>
                      {data.lastMessage.message.length > 25
                        ? `${data.lastMessage.message.substr(0, 25)}...`
                        : data.lastMessage.message}
                    </p>
                  </div>
                  <div className='artistChatlist-chatTime'>
                    <p className='artistChatlist-time'>
                      {moment(data.lastMessage.time).fromNow()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Fragment>
        )}
        {/**[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((row, i) => (
          <div className='artistChat-chatBox' key={i}>
            <div className='artistChatlist-imgDiv'>
              <img
                src={userIcon}
                alt='user-pic'
                className='artistChatlist-img'
              />
            </div>
            <div className='artistChatlist-contentDiv'>
              <div className='artistChatlist-userInfo'>
                <h4 className='artistChatlist-username'>{`data.userPhone`}</h4>
                <p className='artistChatlist-lastmsg'>
                  {`data.lastMessage.message, hi my name is shikhar`.length > 25
                    ? `${'data.lastMessage.message, hi my name is shikhar'.substr(
                        0,
                        25
                      )}...`
                    : 'data.lastMessage.message'}
                </p>
              </div>
              <div className='artistChatlist-chatTime'>
                <p className='artistChatlist-time'>
                  {moment(new Date()).fromNow()}
                </p>
              </div>
            </div>
          </div>
        )) */}
      </div>
      {(() => {
        if (home == 1 && chat == 0 && lock == 0) {
          return (
            <div>
              <div className='icons-tab'>
                <div className='nav'>
                  <HomeB />

                  <Chat
                    onClick={() => {
                      setChat(1);
                      setHome(0);
                      navigate('/chat');
                    }}
                  />

                  <Lock
                    onClick={() => {
                      setLock(1);
                      setHome(0);
                      navigate(`/artist/landing`);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        } else if (chat == 1 && home == 0 && lock == 0) {
          return (
            <div>
              <div className='icons-tab'>
                <div className='nav'>
                  <Home
                    onClick={() => {
                      setHome(1);
                      setChat(0);
                      navigate('/income');
                    }}
                  />

                  <ChatB />

                  <Lock
                    onClick={() => {
                      setLock(1);
                      setChat(0);
                      navigate(`/artist/landing`);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        } else if (lock == 1 && chat == 0 && home == 0) {
          return (
            <div>
              <div className='icons-tab'>
                <div className='nav'>
                  <Home
                    onClick={() => {
                      setHome(1);
                      setLock(0);
                      navigate(`/income`);
                    }}
                  />

                  <Chat
                    onClick={() => {
                      setChat(1);
                      setLock(0);
                      navigate('/chat');
                    }}
                  />

                  <LockB />
                </div>
              </div>
            </div>
          );
        }
      })()}
    </div>
  );
};
export default ChatList;
