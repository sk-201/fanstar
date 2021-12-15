import React from 'react';
import {Route , Routes } from 'react-router-dom';
import Login from './login/login';
import OTP from './otp/otp';
import './App.css';

function App() {
  return (
    <div className="App">
    <Routes>

    <Route path='/login' element={<Login/>} />
    <Route path='otp' element={<OTP/>}/>
    </Routes>
    </div>
  );
}

export default App;
