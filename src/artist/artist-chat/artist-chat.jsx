import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackArrow from '../../assets/backArrow.svg';
import avatar from '../../assets/avatar.png';
import generateLink from '../../assets/generateLink.svg';
import completeStatus from '../../assets/completeStatus.svg';
import sendIcon from '../../assets/sendIcon.svg';
import socket from '../../socket';
import API from '../../api';
import { imageUrl } from '../../utils';
import '../../user/user-chat/user-chat.css';
import ConfirmationScreen from './ConfirmationScreen';
import BottomNav from '../BottomNav/BottomNav';

const ArtistChat = () => {
  const [message, setMessage] = useState('');
  const [meetLink, setMeetLink] = useState('');
  const [boolVal, setBoolVal] = useState(false);
  const [confirmScreen, setConfirmScreen] = useState(false);
  const [confirmType, setConfirmType] = useState(false);
  const { state } = useLocation();
  const { userId, roomId, paymentId } = state;
  const [messages, setMessages] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const navigate = useNavigate();

  // console.log(state);

  useEffect(() => {
    if (!boolVal) {
      API.get(`/api/chat/getachat/${roomId}`)
        .then(({ data }) => {
          console.log(data);
          setServiceName(data.paymentId.serviceName);
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
      setConfirmScreen(false);
      setConfirmType('');
      navigate('/chat');
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
      setMeetLink(data);
      window.open(data, '_blank');
      setConfirmScreen(false);
      setConfirmType('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = (type) => {
    setConfirmType(type);
    setConfirmScreen(true);
  };

  return (
    <Fragment>
      <div className='artistChat-mainContainerDiv'>
        <div className='artistChat-headerDiv'>
          <div className='artistChat-headerLeft'>
            <div className='artistChat-back' onClick={() => navigate('/chat')}>
              <img src={BackArrow} alt='back' className='artistChat-backIcon' />
            </div>
            <div className='artistChat-userDetails'>
              <img src={avatar} alt='user' className='artistChat-userImage' />
              <div className='artistChat-usernameAndService'>
                <p className='artistChat-username'>
                  {state.username ? state.username : ''}
                </p>
                <span className='artistChat-serviceName'>{serviceName}</span>
              </div>
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
                {mes.isImage ? (
                  <img
                    src={`${imageUrl}/${mes.message}`}
                    alt='emoji'
                    width='24px'
                    height='24px'
                    style={{ borderRadius: '8px' }}
                  />
                ) : (
                  mes.message
                )}
              </div>
            );
          })}
          {/**[1, 2, 3, 4, 5, 6, 7, 8, 9].map((mes, ind) => {
            return (
              <div className={'sent-message'} key={ind}>
                {' '}
                {'hello'}
              </div>
            );
          }) */}
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
        <BottomNav active='chat' />
      </div>
    </Fragment>
  );
};

export default ArtistChat;
