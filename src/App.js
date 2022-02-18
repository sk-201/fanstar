import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import ArtistPrivateRoute from './Routes/ArtistPrivateRoute';
import Login from './user/login/login';
import Otp from './user/otp/otp';
import Resend from './user/resend/resend';
import Register from './user/service-register/Register';
import Feedback from './user/feedback/feedback';
import Balance from './user/balance -screen/balance';
// import Subscription from './user/susbscriptions/subscriptions';
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
import AllTransactions from './artist/transactions/AllTransactions';
import RequestWithdrawal from './artist/request-withdraw/RequestWithdrawal';
import RenewSubscription from './user/RenewSubscription/RenewSubscription';
import UserChatList from './user/user-chat/UserChatList';
import IntroScreen from './home/IntroScreen';
import AddAlbum from './artist/add-album/AddAlbum';
import ViewAlbum from './artist/view-album/ViewAlbum';
import EditAlbum from './artist/edit-album/EditAlbum';
import AlbumList from './user/album-list/AlbumList';
import PurchasedAlbum from './user/purchased-album/PurchasedAlbum';
import MyAlbums from './artist/my-albums/MyAlbums';

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
          <Route path='/' exact element={<IntroScreen />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/otp/:phone' exact element={<Otp />} />
          <Route path='/resend' exact element={<Resend />} />
          <Route
            path='/artist/:artistName/:artistId/user/service/:serviceId'
            exact
            element={<Register />}
          />
          <Route
            path='/artist/:artistName/:artistId/user/feedback'
            exact
            element={<Feedback />}
          />
          <Route
            path='/artist/:artistName/:artistId/user/service/:serviceId/payment'
            exact
            element={<Balance />}
          />
          <Route
            path='/artist/:artistName/:artistId/user/image/:albumId'
            exact
            element={<AlbumBuy />}
          />
          <Route
            path='/artist/:artistName/:id/wallet'
            exact
            element={<WalletBalance />}
          />
          <Route
            path='/artist/:artistName/:id/user/imagelist'
            exact
            element={<Album />}
          />
          <Route
            path='/artist/:artistName/:id/user/bookings'
            exact
            element={<Bookings />}
          />
          <Route
            path='/artist/:artistName/:id/albumlist'
            exact
            element={<AlbumList />}
          />
          <Route
            path='/artist/:artistName/:id/viewalbum/:albumId'
            exact
            element={<PurchasedAlbum />}
          />

          {/** <Route path='/artist/:id/sub' element={<Subscription />} /> */}
          <Route
            path='/artist/:artistName/:id/subscribe/:albumId'
            exact
            element={<Subscribe />}
          />
          <Route
            path='/artist/:artistName/:id/renew'
            exact
            element={<RenewSubscription />}
          />
          <Route
            path='/artist/:artistName/:id/subscribe/payment'
            exact
            element={<SubBalance />}
          />
          <Route
            path='/artist/:artistName/:id/user/chat'
            exact
            element={<ChatScreen />}
          />
          <Route
            path='/artist/:artistName/:id/user/chatlist'
            exact
            element={<UserChatList />}
          />
          <Route path='/pay' exact element={<Payment />} />
          <Route path='/income' exact element={<Income />} />
          <Route
            path='/income/transaction'
            exact
            element={<AllTransactions />}
          />
          <Route
            path='/income/request-withdraw'
            exact
            element={<RequestWithdrawal />}
          />
          <Route path='/edit' exact element={<Edit />} />
          <Route path='/addservice' exact element={<AddService />} />
          <Route path='/editservice/:id' exact element={<EditService />} />
          <Route path='/service' exact element={<MyService />} />
          <Route path='/add' exact element={<AddImage />} />
          <Route path='/artist/landing' exact element={<ArtistLanding />} />
          <Route
            path='/artist/landing/:token'
            exact
            element={<ArtistLanding />}
          />
          <Route path='/artist/login' exact element={<ArtistLogin />} />
          <Route path='/artist/addalbum' exact element={<AddAlbum />} />
          <Route path='/artist/myalbums' exact element={<MyAlbums />} />
          <Route path='/artist/viewalbum/:id' exact element={<ViewAlbum />} />
          <Route path='/artist/editalbum/:id' exact element={<EditAlbum />} />
          <Route path='/artist/otp/:phone' exact element={<ArtistOtp />} />
          <Route path='/myimage' exact element={<MyImage />} />
          <Route path='/chat' exact element={<ChatList />} />
          <Route path='/artist/chat' exact element={<ArtistChat />} />
          <Route path='/employee/login' exact element={<EmployeeLogin />} />
          <Route path='/employee/otp/:phone' exact element={<EmployeeOtp />} />
          <Route path='/employee/income' exact element={<EmployeeIncome />} />
          <Route
            path='/employee/myArtists'
            exact
            element={<EmployeeLinkedArtist />}
          />
          <Route
            path='/employee/myArtists/:artistId'
            exact
            element={<LinkedArtistDetials />}
          />
          <Route path='/employee/profile' exact element={<EmployeeProfile />} />
          <Route
            path='/artist/:artistName/:id'
            exact
            element={<ArtistPage />}
          />
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
