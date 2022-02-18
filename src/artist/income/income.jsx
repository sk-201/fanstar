import React, { useState, useEffect, Fragment } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';
// import demo from '../../assets/demoProfile.png';
import avatar from '../../assets/avatar.png';
import Logo from '../../assets/Ellipse 58.png';
import fanstar_logo from '../../assets/fanstar_logo.svg';
import './income.css';
import BottomNav from '../BottomNav/BottomNav';

const Income = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [weeklyIncome, setWeeklyIncome] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [artistCommission, setArtistCommission] = useState(0);
  // const [amountPending, setAmountPending] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [pendingData, setPendingData] = useState([]);
  const [artistData, setArtistData] = useState({});
  const [boolVal, setBoolVal] = useState(false);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
    },
  };

  const fetchArtistProfile = () => {
    API.get('/api/artist/private/getownprofile', config)
      .then(({ data }) => {
        setBalance(data.balance);
        setAmountPaid(data.paid);
        setArtistData(data);
        setArtistCommission(parseInt(data.commission) / 100);
        fetchWeeklyPayments(parseInt(data.commission) / 100);
      })
      .catch((error) => console.log(error));
  };

  const fetchWeeklyPayments = async (comm) => {
    try {
      const { data } = await API.get(
        '/api/artist/private/getownpayments',
        config
      );
      setTotalOrders(data.length);
      let pending = 0,
        weekly = 0;
      let today = new Date();
      let before = new Date(today);
      before.setDate(today.getDate() - 6);
      data.forEach((d) => {
        if (d.status === 'pending') {
          pending += 1;
        }
        if (new Date(d.createdAt).getTime() >= before) {
          weekly += parseInt(d.amount);
        }
      });
      setWeeklyIncome(weekly * comm);
      setPendingOrders(pending);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPendingOrders = async () => {
    try {
      const { data } = await API.get(
        '/api/artist/private/getownpendingorders',
        config
      );
      // console.log(data);
      setPendingData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchArtistProfile();
      fetchPendingOrders();
      setBoolVal(true);
    }
  }, [boolVal]);

  const chatHandler = async (orderData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
        },
      };
      const { data } = await API.get(
        '/api/artist/private/getownprofile',
        config
      );

      const res = await API.post(
        '/api/chat/createchat',
        {
          user1: data._id,
          user2: orderData?.userId?._id,
          paymentId: orderData._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      navigate(`/artist/chat`, {
        state: {
          // artistId: data._id,
          roomId: res.data,
          // userId: orderData?.userId?._id,
          userId: data._id,
          serviceId: orderData?.serviceId?._id,
          paymentId: orderData._id,
          username: orderData?.userId?.username,
          userEmail: orderData?.userId?.email,
          artistEmail: artistData.email,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className='income'>
        <div className='img-cont-inc'>
          <span id='fanstar'>Fanstar</span>
        </div>
        <img id='logo-img' src={fanstar_logo} />
        <div className='main-container'>
          <span id='tot-inc-text'>Total Income</span>
          <div
            className='total-income'
            onClick={() =>
              navigate('/income/transaction', {
                state: artistCommission,
              })
            }
          >
            <h2 id='tot-inc-text-1'>Total Income</h2>
            <h1 id='tot-inc-rs'> Rs {parseInt(balance)}/-</h1>
          </div>
          <span id='week-inc-text'>Weekly Income</span>
          <div className='weekly-income'>
            <h2 id='week-inc-text-1'>Weekly Income</h2>
            <h1 id='week-inc-rs'>Rs {weeklyIncome}/-</h1>
          </div>
          <span id='tot-inc-text'>Balance Withdrawn</span>
          <div className='total-income gradient'>
            <h2 id='tot-inc-text-1-changeColor'>Balance Withdrawn</h2>
            <h1 id='tot-inc-rs-changeColor'> Rs {parseInt(amountPaid)}/-</h1>
            {/**<button
              className='request-btn'
              onClick={() =>
                navigate('/income/request-withdraw', {
                  state:
                    parseInt(balance) - amountPending - parseInt(amountPaid),
                })
              }
            >
              Request
            </button> */}
          </div>
          <h3 id='tot-app'>Total no app visits</h3>
          <h2 id='tot-app-no'>{artistData.appVisits}</h2>
          <h3 id='tot-ord'>Total Orders</h3>
          <h2 id='tot-ord-no'>{totalOrders}</h2>
          <h3 id='pend-ord'>Pending Orders</h3>
          <h2 id='pend-ord-no'>{pendingOrders}</h2>
          {pendingData.length > 0 && (
            <div className='pending-orderList'>
              <h2 className='pending-orderTitle'>My Pending Orders</h2>
              {pendingData.map((data) => (
                <div
                  className='pending-container'
                  key={data._id}
                  onClick={() => chatHandler(data)}
                >
                  <div className='pending-userImgDiv'>
                    <img
                      src={avatar}
                      alt='user-pic'
                      className='pending-userImage'
                    />
                  </div>
                  <div className='pending-userDetails'>
                    <h3 className='pending-userName'>
                      {data?.userId?.username}
                    </h3>
                    <p className='pending-orderName'>
                      {data?.serviceId?.serviceName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <BottomNav active='home' />
    </Fragment>
  );
};
export default Income;
