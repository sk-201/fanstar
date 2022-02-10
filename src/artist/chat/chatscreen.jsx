import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import userIcon from '../../assets/chatuser.svg';
import Logo from '../../assets/Ellipse 58.png';
import './chatscreen.css';
import API from '../../api';
import BottomNav from '../BottomNav/BottomNav';

const ChatList = () => {
  const navigate = useNavigate();
  const [artistId, setartistId] = useState('');
  const [artistEmail, setArtistEmail] = useState('');
  const [chats, setChats] = useState([]);
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
        setArtistEmail(data.email);
        API.get(`/api/chat/getallchats/${data._id}`, config)
          .then((res) => {
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
          <img className='chat-headerLogo' src={Logo} />
          <h3 className='chat-headTitle'>Fanstar logo</h3>
        </div>
        <div className='chat-container'>
          {loading ? (
            <h3 className='artistChatlist-loading'>Loading...</h3>
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
                      <h4 className='artistChatlist-username'>
                        {data?.username}
                      </h4>
                      <p className='artistChatlist-lastmsg'>
                        {data?.lastMessage?.message?.length > 25
                          ? `${data?.lastMessage?.message?.substr(0, 25)}...`
                          : data?.lastMessage?.message}
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
      </div>
      <BottomNav active='chat' />
    </Fragment>
  );
};
export default ChatList;
