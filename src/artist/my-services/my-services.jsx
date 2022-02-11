import React, { useState, useEffect } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as BackArrow } from '../../assets/backArrow.svg';
import editIcon from '../../assets/editIcon.svg';
import deleteIcon from '../../assets/dustbin.svg';
import ConfirmationScreen from './ConfirmationScreen';
import './my-services.css';

const MyService = () => {
  const [services, setServices] = useState([]);
  const [openScreen, setOpenScreen] = useState(false);
  const [boolVal, setBoolVal] = useState(false);
  const [serviceId, setServiceId] = useState('');

  useEffect(() => {
    if (!boolVal) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
        },
      };
      API.get('/api/artist/private/ownservices', config)
        .then(({ data }) => {
          setServices(data);
          setBoolVal(true);
        })
        .catch((error) => {
          console.log(error);
          setBoolVal(true);
        });
    }
  }, [boolVal]);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    setServiceId(id);
    setOpenScreen(true);
  };

  return (
    <div className='my-service'>
      <BackArrow id='bck-arrw' onClick={() => navigate('/artist/landing')} />
      <span id='my-service-text'>My Services</span>

      <div className='my-service-container'>
        {services.length > 0 &&
          services.map((data) => {
            return (
              <div key={data._id}>
                <div className='service-editBtnDiv'>
                  <button
                    className='service-editBtn'
                    onClick={() => {
                      navigate(`/editservice/${data._id}`);
                    }}
                  >
                    <span className='service-editSpan'>Edit</span>
                    <span className='service-iconSpan'>
                      <img
                        src={editIcon}
                        alt='edit'
                        className='service-editIcon'
                      />
                    </span>
                  </button>
                  <button
                    className='service-editBtn'
                    onClick={() => handleDelete(data._id)}
                  >
                    <span className='service-editSpan'>Delete</span>
                    <span className='service-iconSpan'>
                      <img
                        src={deleteIcon}
                        alt='edit'
                        className='service-editIcon'
                      />
                    </span>
                  </button>
                </div>
                <h2 id='serv-name'>Service Name</h2>
                <h3 id='per-serv'>Personalised Services</h3>
                <p id='serv-name-details'>{data.serviceName}</p>
                <h2 id='serv-tot-amt'>Total Amount</h2>
                <h3 id='tot-amt-details'>{data.amount}</h3>
                <h2 id='serv-desc'>Service Description</h2>
                <p id='serv-desc-details'>{data.description}</p>
              </div>
            );
          })}
      </div>
      {openScreen && (
        <ConfirmationScreen
          close={() => setOpenScreen(false)}
          id={serviceId}
          refresh={() => setBoolVal(false)}
        />
      )}
    </div>
  );
};
export default MyService;
