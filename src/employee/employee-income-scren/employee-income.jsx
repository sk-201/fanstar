import React, { useState, useEffect } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Home } from '../.././assets/home-white.svg';
import { ReactComponent as ChatB } from '../.././assets/chat-black.svg';
import { ReactComponent as LockB } from '../.././assets/Ellipse 66.svg';
import { ReactComponent as HomeB } from '../.././assets/home.svg';
import { ReactComponent as Chat } from '../.././assets/chat.svg';
import { ReactComponent as Lock } from '../.././assets/opep.svg';
import Logo from '../../assets/Ellipse 58.png';
const EmployeeIncome = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [weeklyIncome, setWeeklyIncome] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [boolVal, setBoolVal] = useState(false);
  const [home, setHome] = useState(1);
  const [chat, setChat] = useState(0);
  const [lock, setLock] = useState(0);
  const navigate = useNavigate();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('fanstarEmployeeToken')}`,
    },
  };

  const fetchTotalAndWeeklyIncome = async () => {
    try {
      const { data } = await API.get(
        '/api/employee/private/getpaymentsofownartists',
        config
      );
      setTotalOrders(data.length);
      let today = new Date();
      let before = new Date(today);
      before.setDate(today.getDate() - 6);
      let total = 0,
        pending = 0,
        weekly = 0;
      data.forEach((d) => {
        if (d.status === 'pending') {
          pending += 1;
        }
        if (
          d.status === 'completed' &&
          new Date(d.createdAt).getTime() >= before
        ) {
          weekly += parseInt(d.amount);
        }
        total += parseInt(d.amount);
      });
      setTotalIncome(total);
      setWeeklyIncome(weekly);
      setPendingOrders(pending);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEmployeeProfile = async () => {
    try {
      const { data } = await API.get(
        '/api/employee/private/getownprofile',
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchTotalAndWeeklyIncome();
      fetchEmployeeProfile();
      setBoolVal(true);
    }
  }, [boolVal]);

  return (
    <div className='income'>
      <div className='img-cont-inc'>
        <span id='fanstar'>Fanstar logo</span>
      </div>
      <img id='logo-img' src={Logo} />
      <div className='main-container'>
        <span id='tot-inc-text'>Total Income</span>
        <div className='total-income'>
          <h2 id='tot-inc-text-1'>Total Income</h2>
          <h1 id='tot-inc-rs'> Rs {totalIncome}/-</h1>
        </div>
        <span id='week-inc-text'>Weekly Income</span>
        <div className='weekly-income'>
          <h2 id='week-inc-text-1'>Weekly Income</h2>
          <h1 id='week-inc-rs'>Rs {weeklyIncome}/-</h1>
        </div>
        {/**<h3 id='tot-app'>Total no app visits</h3>
        <h2 id='tot-app-no'>100,789</h2> */}
        <h3 id='tot-ord'>Total Orders</h3>
        <h2 id='tot-ord-no'>{totalOrders}</h2>
        <h3 id='pend-ord'>Pending Orders</h3>
        <h2 id='pend-ord-no'>{pendingOrders}</h2>
      </div>
      {(() => {
        if (home == 1 && chat == 0 && lock == 0) {
          return (
            <div>
              <div className='icons-tab' style={{ marginLeft: '-1.8rem' }}>
                <div className='nav'>
                  <HomeB />

                  <Chat
                    onClick={() => {
                      setChat(1);
                      setHome(0);
                      navigate('/employee/myArtists');
                    }}
                  />

                  <Lock
                    onClick={() => {
                      setLock(1);
                      setHome(0);
                      navigate(`/employee/profile`);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        } else if (chat == 1 && home == 0 && lock == 0) {
          return (
            <div>
              <div className='icons-tab' style={{ marginLeft: '-1.8rem' }}>
                <div className='nav'>
                  <Home
                    onClick={() => {
                      setHome(1);
                      setChat(0);
                      navigate('/employee/income');
                    }}
                  />

                  <ChatB />

                  <Lock
                    onClick={() => {
                      setLock(1);
                      setChat(0);
                      navigate(`/employee/profile`);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        } else if (lock == 1 && chat == 0 && home == 0) {
          return (
            <div>
              <div className='icons-tab' style={{ marginLeft: '-1.8rem' }}>
                <div className='nav'>
                  <Home
                    onClick={() => {
                      setHome(1);
                      setLock(0);
                      navigate(`/employee/income`);
                    }}
                  />

                  <Chat
                    onClick={() => {
                      setChat(1);
                      setLock(0);
                      navigate('/employee/myArtists');
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
export default EmployeeIncome;
