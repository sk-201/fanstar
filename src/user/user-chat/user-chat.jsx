import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BackArrow from '../../assets/backArrow.svg';
import avatar from '../../assets/avatar.png';
import completeStatus from '../../assets/completeStatus.svg';
import sendIcon from '../../assets/sendIcon.svg';
import emoji from '../../assets/emoji.svg';
import socket from '../../socket';
import API from '../../api';
import { imageUrl } from '../../utils';
import BottomNav from '../BottomNav/BottomNav';
import ConfirmationScreen from './ConfirmationScreen';

import './user-chat.css';

const ChatScreen = () => {
  const [artistDetails, setArtistDetails] = useState({});
  const [message, setMessage] = useState('');
  const { state } = useLocation();
  const { userId, roomId, artistId } = state;
  const [messages, setMessages] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [emojis, setEmojis] = useState([]);
  const [emojiDisplay, setEmojiDisplay] = useState(false);
  const [boolVal, setBoolVal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();
  const { id, artistName } = useParams();

  //  console.log(state);

  if (!state) {
    navigate(`/artist/${artistName}/${id}/user/chatlist`);
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
          console.log(data);
          setServiceName(data.paymentId.serviceName);
          setMessages(data.allMessages);
        })
        .catch((error) => console.log(error));
      API.get('/api/user/private/getemojies', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('fanstarUserToken')}`,
        },
      })
        .then(({ data }) => {
          // console.log(data);
          // console.log(`${imageUrl}/${data[0].emoji}`);
          setEmojis(data);
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

  const send = async (e) => {
    e.preventDefault();
    if (message.length > 0) {
      try {
        const { data } = await API.put(
          '/api/user/private/deductbalance',
          {
            roomId: roomId,
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
        // console.log(data);
        socket.emit('sendmessage', { userId, roomId, message, isImage: false });
        setMessage('');
      } catch (error) {
        alert('Check your wallet balance!');
        navigate(`/artist/${artistName}/${id}/wallet`);
        setMessage('');
      }
    }
  };

  const sendEmoji = async (emId, url) => {
    try {
      const { data } = await API.post(
        '/api/user/private/giveemoji',
        {
          artistId: id,
          emojiId: emId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('fanstarUserToken')}`,
          },
        }
      );
      console.log(url);
      socket.emit('sendmessage', {
        userId,
        roomId,
        message: url,
        isImage: true,
      });
      setMessage('');
      setEmojiDisplay(false);
    } catch (error) {
      alert('Check your wallet balance!');
      navigate(`/artist/${artistName}/${id}/wallet`);
      setMessage('');
    }
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
      navigate(`/artist/${artistName}/${id}/user/feedback`);
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
              onClick={() =>
                navigate(`/artist/${artistName}/${artistId}/user/chatlist`)
              }
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
              <div className='artistChat-usernameAndService'>
                <p className='artistChat-username'>
                  {artistDetails.username ? artistDetails.username : ''}
                </p>
                <span className='artistChat-serviceName'>{serviceName}</span>
              </div>
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
        <div className={`artistChat-div ${emojiDisplay ? 'changeHeight' : ''}`}>
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
        </div>
        <div
          className={`userChat-inputDiv ${emojiDisplay ? 'changeBottom' : ''}`}
        >
          <form className='artistChat-inputForm'>
            <div className='artistChat-inputFieldDiv'>
              <input
                type='text'
                className='artistChat-inputField'
                placeholder='Type a message...'
                value={message}
                onChange={(e) => {
                  if (emojiDisplay) {
                    setEmojiDisplay(false);
                  }
                  setMessage(e.target.value);
                }}
              />
              <button
                className='artistChat-emojiBtn'
                type='button'
                onClick={() => setEmojiDisplay(!emojiDisplay)}
              >
                <img
                  className='artistChat-emojiBtnIcon'
                  src={emoji}
                  alt='emoji'
                />
              </button>
            </div>
            <button type='submit' className='artistChat-sendMsg' onClick={send}>
              <img src={sendIcon} alt='send' className='msgSend-icon' />
            </button>
          </form>
          {emojiDisplay && (
            <div className='artist-emojisListDiv'>
              {emojis.map((em) => {
                // console.log(`${imageUrl}/${em.emoji}`);
                return (
                  <div
                    className='artist-emojiDiv'
                    key={em._id}
                    onClick={() => sendEmoji(em._id, em.emoji)}
                  >
                    <div className='emojiIconDiv'>
                      <img
                        src={`${imageUrl}/${em.emoji}`}
                        className='emojiIcon'
                        alt='emoji'
                      />
                    </div>
                    <span className='emojiPrice'>{em.price}</span>
                  </div>
                );
              })}
            </div>
          )}
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
