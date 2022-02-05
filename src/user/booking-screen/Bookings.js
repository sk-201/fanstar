import React, { useEffect, useState, Fragment } from 'react';
import API from '../../api.js';
import BottomNav from '../BottomNav/BottomNav.js';
import './Bookings.css';

const Bookings = () => {
  const [bookingData, setBookingData] = useState([]);
  const [boolVal, setBoolVal] = useState(false);

  const fetchUserBooking = async () => {
    try {
      const { data } = await API.get('/api/user/private/getpaymentsofauser', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
        },
      });
      setBookingData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchUserBooking();
      setBoolVal(true);
    }
  }, [boolVal]);

  return (
    <Fragment>
      <div className='booking-mainContainer'>
        <div className='booking-header'>
          <h3 className='booking-heading'>Bookings</h3>
        </div>
        <div className='booking-orderContainer'>
          {bookingData.map((order) => (
            <div className='booking-orderDiv' key={order._id}>
              <h3 className='booking-orderHead'>{`#${order._id}`}</h3>
              <div className='booking-serviceContentDiv'>
                <h3 className='booking-serviceHeading'>Personalised Service</h3>
                <p className='booking-serviceDetails'>
                  I will promote your brand on my instagram{' '}
                </p>
              </div>
              <p className='booking-handle'>
                Service name:{' '}
                <span className='booking-handleDetail'>
                  {order?.serviceId?.serviceName}
                </span>
              </p>
              <p className='booking-handle'>
                Social handle:{' '}
                <span className='booking-handleDetail'>
                  {order?.userId?.insta}
                </span>
              </p>
              <p className='booking-status'>
                Orders Status:{' '}
                <span className='booking-statusDetail'>{order.status}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active='booking' />
    </Fragment>
  );
};

export default Bookings;
