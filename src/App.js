import React from 'react';
import {Route , Routes } from 'react-router-dom';
import Landing from './landing/landing';
import Login from './login/login';
import Otp from './otp/otp';
import Resend from './resend/resend';
import Register from './chat-register/Register'
import Feedback from './feedback/feedback';
import Balance from './balance -screen/balance';
import Subscription from './susbscriptions/subscriptions';
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
    </Routes>
    </div>
  );
}

export default App;
