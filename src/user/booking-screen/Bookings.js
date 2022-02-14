import React, { useEffect, useState, Fragment } from 'react';
import API from '../../api.js';
import BottomNav from '../BottomNav/BottomNav.js';
import './Bookings.css';

const Bookings = () => {
  const [bookingData, setBookingData] = useState([]);
  const [boolVal, setBoolVal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUserBooking = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/api/user/private/getpaymentsofauser', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('fanstarUserToken')}`,
        },
      });
      setBookingData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
          {loading ? (
            <h3 className='artistChatlist-loading'>Loading...</h3>
          ) : (
            <Fragment>
              {bookingData.length === 0 ? (
                <h3 className='artistChatlist-loading'>No Booking Found</h3>
              ) : (
                <Fragment>
                  {bookingData.map((order) => (
                    <div className='booking-orderDiv' key={order._id}>
                      <h3 className='booking-orderHead'>{`#${order._id}`}</h3>
                      <div className='booking-serviceContentDiv'>
                        <h3 className='booking-serviceHeading'>
                          Personalised Service
                        </h3>
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
                        <span className='booking-statusDetail'>
                          {order.status}
                        </span>
                      </p>
                    </div>
                  ))}
                </Fragment>
              )}
            </Fragment>
          )}
        </div>
      </div>
      <BottomNav active='booking' />
    </Fragment>
  );
};

export default Bookings;
