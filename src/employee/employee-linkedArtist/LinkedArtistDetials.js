import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../api';
// import ConfirmationScreen from './ConfirmationScreen';
import avatar from '../../assets/avatar.png';
import backArrow from '../../assets/backArrow.svg';
// import deleteIcon from '../../assets/deleteIcon.svg';
import BottomNav from '../BottomNav/BottomNav';
import './EmployeeLinkedArtist.css';

const LinkedArtistDetials = () => {
  const navigate = useNavigate();
  const { artistId } = useParams();
  const [totalIncome, setTotalIncome] = useState(0);
  const [weeklyIncome, setWeeklyIncome] = useState(0);
  const [artistData, setArtistData] = useState({});
  const [boolVal, setBoolVal] = useState(false);
  // const [openConfirm, setOpenConfirm] = useState(false);

  // const deleteArtist = async () => {
  //   try {
  //     await API.delete(`/api/employee/private/deleteartist/${artistId}`, {
  //       headers: {
  //         Authorization: `Bearer ${window.localStorage.getItem(
  //           'fanstarEmployeeToken'
  //         )}`,
  //       },
  //     });
  //     navigate('/employee/myArtists');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchArtistDetails = async (id) => {
    try {
      const { data } = await API.get(
        `/api/employee/private/getparticularartist/${id}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              'fanstarEmployeeToken'
            )}`,
          },
        }
      );
      setArtistData(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
      navigate('/employee/myArtists');
    }
  };

  const fetchTotalAndWeeklyIncome = async (artistId) => {
    try {
      const { data } = await API.get(
        `/api/employee/private/getpayments/${artistId}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              'fanstarEmployeeToken'
            )}`,
          },
        }
      );
      console.log(data);
      let today = new Date();
      let before = new Date(today);
      before.setDate(today.getDate() - 6);
      let total = 0,
        weekly = 0;
      data.forEach((d) => {
        if (new Date(d.createdAt).getTime() >= before) {
          weekly += parseInt(d.amount);
        }
        total += parseInt(d.amount);
      });
      setTotalIncome(total * 0.7);
      setWeeklyIncome(weekly * 0.7);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchArtistDetails(artistId);
      fetchTotalAndWeeklyIncome(artistId);
      setBoolVal(true);
    }
  }, [boolVal, artistId]);

  return (
    <Fragment>
      <div className='linkedArtist-container'>
        <div className='linkedArtist-headerDiv'>
          <div className='linkedArtist-headerLeft'>
            <img
              src={backArrow}
              alt='back'
              className='linkedArtist-backBtn'
              onClick={() => navigate('/employee/myArtists')}
            />
            <img
              src={
                artistData?.artistDet?.profilePhoto
                  ? artistData?.artistDet?.profilePhoto
                  : avatar
              }
              alt='artist'
              className='linkedArtist-artistImg'
            />
            <div className='linkedArtist-headerContentDiv'>
              <p className='linkedArtist-artistName'>
                {artistData?.artistDet?.username}
              </p>
              <p className='linkedArtist-artistOrders'>
                Pending orders: {artistData?.orderObj?.pendingOrders}
              </p>
            </div>
          </div>
          {/**<div className='linkedArtist-headerRight'>
            <button
              className='linkedArtist-delete'
              onClick={() => setOpenConfirm(true)}
            >
              <img
                src={deleteIcon}
                alt='delete'
                className='linkedArtist-deleteIcon'
              />
            </button>
          </div> */}
        </div>
        <div className='linkedArtist-incomeContainer'>
          <div className='linkedArtist-incomeDiv'>
            <h3 className='linkedArtist-incomeHead'>Total Income</h3>
            <div className='linkedArtist-incomeCard'>
              <h3 className='incomeCard-heading'>Total Income</h3>
              <p className='incomeCard-amount'>{`Rs ${totalIncome}/-`}</p>
            </div>
          </div>
          <div className='linkedArtist-incomeDiv'>
            <h3 className='linkedArtist-incomeHead'>Weekly Income</h3>
            <div className='linkedArtist-incomeCard'>
              <h3 className='incomeCard-heading'>Weekly Income</h3>
              <p className='incomeCard-amount'>{`Rs ${weeklyIncome}/-`}</p>
            </div>
          </div>
        </div>
        <div className='linkedArtist-otherDetailsDiv'>
          <div className='linkedartist-appVisit'>
            <p className='appVisit-head'>
              Total number of app visits of {artistData?.artistDet?.username}
            </p>
            <p className='appVisit-number'>
              {artistData?.artistDet?.appVisits}
            </p>
          </div>
          <div className='linkedartist-appVisit'>
            <p className='appVisit-head'>
              Total Orders recieved by {artistData?.artistDet?.username}
            </p>
            <p className='appVisit-number'>
              {artistData?.orderObj?.totalOrders}
            </p>
          </div>
          <div className='linkedartist-appVisit'>
            <p className='appVisit-head'>Pending Orders</p>
            <p className='appVisit-number pendingOrder'>
              {artistData?.orderObj?.pendingOrders}
            </p>
          </div>
        </div>
        {/**openConfirm && (
          <ConfirmationScreen
            close={() => setOpenConfirm(false)}
            deleteArtist={deleteArtist}
          />
        ) */}
      </div>
      <BottomNav active='artists' />
    </Fragment>
  );
};

export default LinkedArtistDetials;
