import React from 'react';
import {Route , Routes } from 'react-router-dom';
import Landing from './user/landing/landing';
import Login from './user/login/login';
import Otp from './user/otp/otp';
import Resend from './user/resend/resend';
import Register from './user/chat-register/Register'
import Feedback from './user/feedback/feedback';
import Balance from './user/balance -screen/balance';
import Subscription from './user/susbscriptions/subscriptions';
import Payment from './user/payment/payment'
import Subscribe from './user/susbscriptions/subscribe';
import './App.css';

function App() {
  return (
    <div className="App">
    <Routes>
    <Route path='/' element={<Landing/>}/>
    <Route path='/login' element={<Login/>} />
    <Route path='/otp/:phone' element={<Otp/>}/>
    <Route path='/resend' element={<Resend/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/feedback' element={<Feedback/>}/>
    <Route path='/balance' element={<Balance/>}/>
    <Route path='/sub' element={<Subscription/>}/>
    <Route path='/subscribe' element={<Subscribe/>}/>
    <Route path='/pay' element={<Payment/>}/>
    </Routes>
    </div>
  );
}

export default App;
