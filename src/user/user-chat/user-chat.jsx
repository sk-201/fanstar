import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as BackArrow } from '../../assets/backArrow.svg';
import { ReactComponent as UserPhoto } from '../../assets/Ellipse 7.svg';
import { ReactComponent as HomeB } from '../.././assets/home.svg';
import { ReactComponent as Chat } from '../.././assets/chat.svg';
import { ReactComponent as Lock } from '../.././assets/lock.svg';
import { ReactComponent as Wallet } from '../.././assets/wallet.svg';
import { ReactComponent as Bell } from '../.././assets/bell.svg';
import { ReactComponent as User } from '../.././assets/userlogin.svg';
import { ReactComponent as Clock } from '../.././assets/clock.svg';
import { ReactComponent as Home } from '../.././assets/home-white.svg';
import { ReactComponent as ChatB } from '../.././assets/chat-black.svg';
import { ReactComponent as LockB } from '../.././assets/lock-black.svg';
import { ReactComponent as Send } from '../.././assets/send.svg';
import socket from '../../socket';
import API from '../../api';
import './user-chat.css';
import BottomNav from '../BottomNav/BottomNav';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const { state } = useLocation();
  const { userId, roomId, id } = state;

  console.log(state);
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
    });
  }, []);

  const send = (e) => {
    e.preventDefault();
    socket.emit('sendmessage', { userId, roomId, message });
    setMessage('');
  };
  return (
    <Fragment>
      <div className='chat-cont-div'>
        <BackArrow id='bck-arrw' onClick={() => navigate(`/artist/${id}`)} />
        <UserPhoto id='user-photo' />
        <span id='chat-user-name'>Jenna</span>
        <div className='chat-div'>
          <div className='messages'>
            {messages.length > 0
              ? messages.map((mes, ind) => {
                  return (
                    <div
                      className={
                        mes.senderId === userId
                          ? 'sent-message'
                          : 'received-message'
                      }
                      key={ind}
                    >
                      {' '}
                      {mes.message}
                    </div>
                  );
                })
              : null}
          </div>
          <form className='chat-input-div'>
            <input
              type='text'
              className='message-inp'
              placeholder='Type a message...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type='submit' id='message-btn' onClick={send}>
              <Send />
            </button>
          </form>
        </div>
      </div>
      <BottomNav active='chat' />
    </Fragment>
  );
};

export default ChatScreen;
