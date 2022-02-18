import React, { useState, useEffect, Fragment } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';
import fanstar_logo from '../../assets/fanstar_logo.svg';
import BottomNav from '../BottomNav/BottomNav';

const EmployeeIncome = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [weeklyIncome, setWeeklyIncome] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [boolVal, setBoolVal] = useState(false);
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
        if (new Date(d.createdAt).getTime() >= before) {
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
    <Fragment>
      <div className='income'>
        <div className='img-cont-inc'>
          <span id='fanstar'>Fanstar</span>
        </div>
        <img id='logo-img' src={fanstar_logo} />
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
      </div>
      <BottomNav active='home' />
    </Fragment>
  );
};
export default EmployeeIncome;
