import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackArrow from '../../assets/backArrow.svg';
import avatar from '../../assets/avatar.png';
import generateLink from '../../assets/generateLink.svg';
import completeStatus from '../../assets/completeStatus.svg';
import sendIcon from '../../assets/sendIcon.svg';
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
import socket from '../../socket';
import API from '../../api';
import '../../user/user-chat/user-chat.css';
import ConfirmationScreen from './ConfirmationScreen';

const ArtistChat = () => {
  const [message, setMessage] = useState('');
  const [boolVal, setBoolVal] = useState(false);
  const [confirmScreen, setConfirmScreen] = useState(false);
  const [confirmType, setConfirmType] = useState(false);
  const { state } = useLocation();
  const { userId, roomId, paymentId } = state;
  const [messages, setMessages] = useState([]);
  const [home, setHome] = useState(0);
  const [chat, setChat] = useState(1);
  const [lock, setLock] = useState(0);
  const navigate = useNavigate();

  // console.log(state);

  useEffect(() => {
    if (!boolVal) {
      API.get(`/api/chat/getachat/${roomId}`)
        .then(({ data }) => {
          // console.log(data);
          setMessages(data.allMessages);
          setBoolVal(true);
        })
        .catch((error) => {
          console.log(error);
          setBoolVal(true);
        });
    }
  }, [boolVal]); ///api/chat/getallchats/:artistId
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

  const completeStatusClick = async () => {
    try {
      const { data } = await API.put(
        '/api/artist/private/completepayment',
        {
          paymentId: paymentId,
          roomId: roomId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
          },
        }
      );
      alert('Service Completed!');
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const generateMeetLink = async () => {
    try {
      const eventStartTime = new Date();
      eventStartTime.setDate(eventStartTime.getDay() + 2);
      // Create a new event end date instance for temp uses in our calendar.
      const eventEndTime = new Date();
      eventEndTime.setDate(eventEndTime.getDay() + 4);
      eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);
      const body = {
        summary: 'Random summary another NEW',
        location: '3595 California St, San Francisco, CA 94118',
        description: 'Chat with someone',
        colorId: 1,
        startTime: eventStartTime,
        endTime: eventEndTime,
        attendees: [
          { email: 'shikharrastogi.0208@gmail.com' },
          { email: 'naman9071@gmail.com' },
        ],
      };
      const { data } = await API.post('/api/artist/private/addevent', body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = (type) => {
    setConfirmType(type);
    setConfirmScreen(true);
  };

  return (
    <div className='artistChat-mainContainerDiv'>
      <div className='artistChat-headerDiv'>
        <div className='artistChat-headerLeft'>
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
        <div className='artistChat-headerRight'>
          <button
            className='artistChat-generate'
            onClick={() => handleConfirm('meet')}
          >
            <img
              src={generateLink}
              alt='generate'
              className='artistChat-icon'
            />
          </button>
          <button
            className='artistChat-complete'
            onClick={() => handleConfirm('status')}
          >
            <img
              src={completeStatus}
              alt='status'
              className='artistChat-icon'
            />
          </button>
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
      {confirmScreen && (
        <ConfirmationScreen
          type={confirmType}
          close={() => setConfirmScreen(false)}
          handleStatusFunc={completeStatusClick}
          handleMeetFunc={generateMeetLink}
        />
      )}
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
