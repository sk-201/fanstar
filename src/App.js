import React from 'react';
import {Route , Routes } from 'react-router-dom';
import Landing from './landing/landing';
import Login from './login/login';
import Otp from './otp/otp';
import Resend from './resend/resend';
import Register from './chat-register/Register'
import Feedback from './feedback/feedback';
import './App.css';

function App() {
  return (
    <div className="App">
    <Routes>
    <Route path='/' element={<Landing/>}/>
    <Route path='/login' element={<Login/>} />
    <Route path='/otp' element={<Otp/>}/>
    <Route path='/resend' element={<Resend/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/feedback' element={<Feedback/>}/>
    </Routes>
    </div>
  );
}

export default App;
