import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BackArrow from '../../assets/backArrow.svg';
import avatar from '../../assets/avatar.png';
import completeStatus from '../../assets/completeStatus.svg';
import sendIcon from '../../assets/sendIcon.svg';
import socket from '../../socket';
import API from '../../api';
import BottomNav from '../BottomNav/BottomNav';
import ConfirmationScreen from './ConfirmationScreen';

import './user-chat.css';

const ChatScreen = () => {
  const [artistDetails, setArtistDetails] = useState({});
  const [message, setMessage] = useState('');
  const { state } = useLocation();
  const { userId, roomId, artistId } = state;
  const [messages, setMessages] = useState([]);
  const [boolVal, setBoolVal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(state);

  if (!state) {
    navigate(`/artist/${id}/user/chatlist`);
  }

  useEffect(() => {
    API.get(`/api/user/private/getartist/${artistId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('fanstarUserToken')}`,
      },
    })
      .then(({ data }) => {
        setArtistDetails(data);
      })
      .catch((error) => console.log(error));
  }, [artistId]);

  useEffect(() => {
    if (!boolVal) {
      API.get(`/api/chat/getachat/${roomId}`)
        .then(({ data }) => {
          setMessages(data.allMessages);
        })
        .catch((error) => console.log(error));
      setBoolVal(true);
    }
  }, [boolVal, roomId]); ///api/chat/getallchats/:artistId

  useEffect(() => {
    socket.emit('joined', { userId, roomId });
  }, [userId, roomId]);

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

  const completeStatusClick = async () => {
    try {
      const { data } = await API.put(
        '/api/user/private/completepayment',
        {
          paymentId: state.paymentId,
          roomId: state.roomId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('fanstarUserToken')}`,
          },
        }
      );
      alert('Service Completed!');
      setOpenConfirm(false);
      navigate(`/artist/${id}/user/feedback`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className='artistChat-mainContainerDiv'>
        <div className='artistChat-headerDiv'>
          <div className='artistChat-headerLeft'>
            <div
              className='artistChat-back'
              onClick={() => navigate(`/artist/${artistId}/user/chatlist`)}
            >
              <img src={BackArrow} alt='back' className='artistChat-backIcon' />
            </div>
            <div className='artistChat-userDetails'>
              <img
                src={
                  artistDetails.profilePhoto
                    ? artistDetails.profilePhoto
                    : avatar
                }
                alt='user'
                className='userChat-userImage'
              />
              <p className='artistChat-username'>
                {artistDetails.username ? artistDetails.username : ''}
              </p>
            </div>
          </div>
          <div className='artistChat-headerRight'>
            <button
              className='artistChat-complete'
              onClick={() => setOpenConfirm(true)}
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
        <div className='userChat-inputDiv'>
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
        {openConfirm && (
          <ConfirmationScreen
            close={() => setOpenConfirm(false)}
            handleStatusFunc={completeStatusClick}
          />
        )}
        <BottomNav active='chat' />
      </div>
    </Fragment>
  );
};

export default ChatScreen;
