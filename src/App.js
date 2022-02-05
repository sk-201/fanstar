import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from './user/landing/landing';
import Login from './user/login/login';
import Otp from './user/otp/otp';
import Resend from './user/resend/resend';
import Register from './user/service-register/Register';
import Feedback from './user/feedback/feedback';
import Balance from './user/balance -screen/balance';
import Subscription from './user/susbscriptions/subscriptions';
import Edit from './artist/edit profile/editprofile';
import Payment from './user/payment/payment';
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
import AlbumBuy from './user/balance -screen/albumbalance';
import WalletBalance from './user/balance -screen/walletbalance';
import Album from './user/album-gallery/album';
import SubBalance from './user/balance -screen/subscribe-balance';
import ChatScreen from './user/user-chat/user-chat';
import EmployeeLinkedArtist from './employee/employee-linkedArtist/EmployeeLinkedArtist';
import LinkedArtistDetials from './employee/employee-linkedArtist/LinkedArtistDetials';
import ArtistChat from './artist/artist-chat/artist-chat';
import Bookings from './user/booking-screen/Bookings';

import './App.css';
import { setTheme } from './utils';

function App() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  var themeColor = localStorage.getItem('color')
    ? localStorage.getItem('color')
    : 'black';

  if (isMobile) {
    setTheme(themeColor);
    return (
      <div className='App'>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/otp/:phone' element={<Otp />} />
          <Route path='/resend' element={<Resend />} />
          <Route
            path='/artist/:artistId/user/service/:serviceId'
            element={<Register />}
          />
          <Route
            path='/artist/:artistId/user/feedback'
            element={<Feedback />}
          />
          <Route
            path='/artist/:artistId/user/service/:serviceId/payment'
            element={<Balance />}
          />
          <Route
            path='/artist/:artistId/user/album/:albumId'
            element={<AlbumBuy />}
          />
          <Route path='/wallet' element={<WalletBalance />} />
          <Route path='/artist/:id/user/album' element={<Album />} />
          <Route path='/artist/:id/user/bookings' element={<Bookings />} />
          <Route path='/artist/:id/sub' element={<Subscription />} />
          <Route path='/artist/:id/subscribe' element={<Subscribe />} />
          <Route
            path='/artist/:id/subscribe/payment'
            element={<SubBalance />}
          />
          <Route path='/pay' element={<Payment />} />
          <Route path='/income' element={<Income />} />
          <Route path='/edit' element={<Edit />} />
          <Route path='/addservice' element={<AddService />} />
          <Route path='/editservice/:id' element={<EditService />} />
          <Route path='/service' element={<MyService />} />
          <Route path='/add' element={<AddImage />} />
          <Route path='/artist/landing' element={<ArtistLanding />} />
          <Route path='/artist/landing/:token' element={<ArtistLanding />} />
          <Route path='/artist/login' element={<ArtistLogin />} />
          <Route path='/artist/otp/:phone' element={<ArtistOtp />} />
          <Route path='/myimage' element={<MyImage />} />
          <Route path='/chat' element={<ChatList />} />
          <Route path='/artist/:id/user/chat' element={<ChatScreen />} />
          <Route path='/artist/chat' element={<ArtistChat />} />
          <Route path='/employee/login' element={<EmployeeLogin />} />
          <Route path='/employee/otp/:phone' element={<EmployeeOtp />} />
          <Route path='/employee/income' element={<EmployeeIncome />} />
          <Route
            path='/employee/myArtists'
            element={<EmployeeLinkedArtist />}
          />
          <Route
            path='/employee/myArtists/:artistId'
            element={<LinkedArtistDetials />}
          />
          <Route path='/employee/profile' element={<EmployeeProfile />} />
          <Route path='/artist/:id' element={<ArtistPage />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div className='desktop-WarningDiv'>
        <h1>Please open this link in Mobile Or Tablet to View the website.</h1>
      </div>
    );
  }
}

export default App;
