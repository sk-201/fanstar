import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackArrow from '../../assets/backArrow.svg';
import avatar from '../../assets/avatar.png';
import { ReactComponent as Wallet } from '../.././assets/wallet.svg';
import { ReactComponent as Bell } from '../.././assets/bell.svg';
import { ReactComponent as User } from '../.././assets/userlogin.svg';
import { ReactComponent as Clock } from '../.././assets/clock.svg';
import { ReactComponent as Home } from '../.././assets/home-white.svg';
import { ReactComponent as ChatB } from '../.././assets/chat-black.svg';
import { ReactComponent as LockB } from '../.././assets/Ellipse 66.svg';
import { ReactComponent as HomeB } from '../.././assets/home.svg';
import { ReactComponent as Chat } from '../.././assets/chat.svg';
import { ReactComponent as Lock } from '../.././assets/opep.svg';
import sendIcon from '../../assets/sendIcon.svg';
import socket from '../../socket';
import API from '../../api';
import '../../user/user-chat/user-chat.css';

const ArtistChat = () => {
  const [message, setMessage] = useState('');
  const { state } = useLocation();
  const { userId, roomId } = state;
  const [messages, setMessages] = useState([]);
  const [home, setHome] = useState(0);
  const [chat, setChat] = useState(1);
  const [lock, setLock] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/api/chat/getachat/${roomId}`).then(({ data }) => {
      setMessages(data.allMessages);
    });
  }, []); ///api/chat/getallchats/:artistId
  useEffect(() => {
    socket.emit('joined', { userId, roomId });
  }, []);
  useEffect(() => {
    socket.on('sendallmessages', ({ allMessages }) => {
      setMessages(allMessages);
      console.log(allMessages);
    });
  }, []);

  const send = (e) => {
    e.preventDefault();
    socket.emit('sendmessage', { userId, roomId, message });
    setMessage('');
  };

  return (
    <div className='artistChat-mainContainerDiv'>
      <div className='artistChat-headerDiv'>
        <div className='artistChat-back' onClick={() => navigate('/chat')}>
          <img src={BackArrow} alt='back' className='artistChat-backIcon' />
        </div>
        <div className='artistChat-userDetails'>
          <img src={avatar} alt='user' className='artistChat-userImage' />
          <p className='artistChat-username'>
            {state.username ? state.username : ''}
          </p>
        </div>
      </div>
      <div className='artistChat-div'>
        {messages.map((mes, ind) => {
          return (
            <div
              className={
                mes.senderId === userId ? 'sent-message' : 'received-message'
              }
              key={ind}
            >
              {' '}
              {mes.message}
            </div>
          );
        })}
      </div>
      <div className='artistChat-inputDiv'>
        <form className='artistChat-inputForm'>
          <input
            type='text'
            className='artistChat-inputField'
            placeholder='Type a message...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type='submit' className='artistChat-sendMsg' onClick={send}>
            <img src={sendIcon} alt='send' className='msgSend-icon' />
          </button>
        </form>
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

export default ArtistChat;
