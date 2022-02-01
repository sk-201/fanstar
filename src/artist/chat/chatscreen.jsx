import React, { useEffect, useState } from 'react';
import Logo from '../../assets/Ellipse 58.png';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as User } from '../../assets/chatuser.svg';
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
  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
      },
    };
    API.get(`/api/artist/private/getownprofile`, config).then(({ data }) => {
      setartistId(data._id);
      API.get(`/api/chat/getallchats/${data._id}`, config).then((res) => {
        setChats(res.data);
      });
    });
  }, []);

  return (
    <div className='chat'>
      <div className='img-cont-inc' style={{ paddingTop: '1rem' }}>
        <span id='fanstar'>Fanstar logo</span>
      </div>
      <img id='logo-img' src={Logo} />
      <div className='chat-container'>
        {chats.length > 0 &&
          chats.map((data) => {
            return (
              <div
                onClick={() =>
                  navigate('/artist/chat', {
                    state: { userId: artistId, roomId: data.roomId },
                  })
                }
              >
                <span className='chat-span'>
                  <User id='user-icon' />
                  <text id='chat-name'>{data.userPhone}</text>
                  <text id='chat-ch'>
                    {data.lastMessage.message}{' '}
                    <text id='chat-time'>{data.lastMessage.time}</text>
                  </text>
                </span>
              </div>
            );
          })}
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
