import React from 'react';
import {Route , Routes } from 'react-router-dom';
import Landing from './user/landing/landing';
import Login from './user/login/login';
import Otp from './user/otp/otp';
import Resend from './user/resend/resend';
import Register from './user/service-register/Register'
import Feedback from './user/feedback/feedback';
import Balance from './user/balance -screen/balance';
import Subscription from './user/susbscriptions/subscriptions';
import Edit from './artist/edit profile/editprofile';
import Payment from './user/payment/payment'
import Subscribe from './user/susbscriptions/subscribe';
import Income from './artist/income/income';
import AddService from './artist/add-service/add-service';
import EditService from './artist/edit-service/edit-service';
import MyService from './artist/my-services/my-services';
import AddImage from './artist/add-image/add-image';
import ArtistLanding from './artist/artist-landing/artist-landing';
import ArtistLogin from './artist/artist-login/artist-login';
import ArtistOtp from './artist/artist-otp/artist-otp';
import MyImage from './artist/my-images/myimages.';
import ChatList from './artist/chat/chatscreen';
import EmployeeLogin from './employee/employee-login/employee-login';
import EmployeeOtp from './employee/employee-otp/employee-otp';
import EmployeeIncome from './employee/employee-income-scren/employee-income';
import EmployeeProfile from './employee/employee profile/employee-profile';
import ArtistPage from './user/landing/artistpage';
import './App.css';

function App() {
  return (
    <div className="App">
    <Routes>
    <Route path='/' element={<Landing/>}/>
    <Route path='/login' element={<Login/>} />
    <Route path='/otp/:phone' element={<Otp/>}/>
    <Route path='/resend' element={<Resend/>}/>
    <Route path='/artist/:artistId/user/service/:serviceId' element={<Register/>}/>
    <Route path='/feedback' element={<Feedback/>}/>
    <Route path='/balance' element={<Balance/>}/>
    <Route path='/sub' element={<Subscription/>}/>
    <Route path='/subscribe' element={<Subscribe/>}/>
    <Route path='/pay' element={<Payment/>}/>
    <Route path='/income' element={<Income/>}/>
    <Route path='/edit' element={<Edit/>}/>
    <Route path='/addservice' element={<AddService/>}/>
    <Route path='/editservice/:id' element={<EditService/>}/>
    <Route path='/service' element={<MyService/>}/>
    <Route path='/add' element={<AddImage/>}/>
    <Route path='/artist/landing' element={<ArtistLanding/>}/>
    <Route path='/artist/login' element={<ArtistLogin/>}/>
    <Route path='/artist/otp/:phone' element={<ArtistOtp/>}/>
    <Route path='/myimage' element={<MyImage/>}/>
    <Route path='/chat' element={<ChatList/>}/>
    <Route path='/employee/login' element={<EmployeeLogin/>}/>
    <Route path='/employee/otp/:phone' element={<EmployeeOtp/>}/>
    <Route path='/employee/income' element={<EmployeeIncome/>}/>
    <Route path='/employee/profile' element={<EmployeeProfile/>}/>
    <Route path='/artist/:id' element={<ArtistPage/>}/>
    </Routes>
    </div>
  );
}

export default App;
