import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../api';
import backIcon from '../../assets/backArrow.svg';
import './EditAlbum.css';

const initialData = {
  price: '',
  description: '',
  albumName: '',
};

const EditAlbum = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputData, setInputData] = useState(initialData);
  const [boolVal, setBoolVal] = useState(false);

  const fetchAlbumDetails = async (id) => {
    try {
      const { data } = await API.get(
        `/api/artist/private/getaparticularalbum/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
          },
        }
      );
      // console.log(data);
      setInputData({
        ...inputData,
        description: data.description,
        price: data.price,
        albumName: data.albumName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchAlbumDetails(id);
      setBoolVal(false);
    }
  }, [boolVal, id]);

  const handleChange = (e) => {
    const { name } = e.target;
    setInputData({ ...inputData, [name]: e.target.value });
  };

  const handleEditAlbum = async () => {
    try {
      const { data } = await API.put(
        `/api/artist/private/updatealbumdetails`,
        {
          albumId: id,
          description: inputData.description,
          albumName: inputData.albumName,
          price: inputData.price,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
          },
        }
      );
      // console.log(data);
      alert('Album details updated!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='editAlbum-container'>
      <div className='editAlbum-headerDiv'>
        <button
          className='editAlbum-btn editAlbum-backBtn'
          onClick={() => navigate(`/artist/viewalbum/${id}`)}
        >
          <img src={backIcon} alt='back' className='editAlbum-backIcon' />
        </button>
        <h3 className='editAlbum-title'>Edit</h3>
      </div>
      <div className='editAlbum-formSection'>
        <div className='editAlbum-inputDiv'>
          <label className='editAlbum-label'>Album name</label>
          <input
            type='text'
            className='editAlbum-inputField'
            placeholder='typing...'
            name='albumName'
            value={inputData.albumName}
            onChange={handleChange}
          />
        </div>
        <div className='editAlbum-inputDiv'>
          <label className='editAlbum-label'>Total amount</label>
          <input
            type='text'
            className='editAlbum-inputField'
            placeholder='Rs'
            name='price'
            value={inputData.price}
            onChange={handleChange}
          />
        </div>
        <div className='editAlbum-inputDiv'>
          <label className='editAlbum-label'>Album Description</label>
          <input
            type='text'
            className='editAlbum-inputField'
            placeholder='typing...'
            name='description'
            value={inputData.description}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='editAlbum-btnDiv'>
        <button className='editAlbum-submitBtn' onClick={handleEditAlbum}>
          Edit Album
        </button>
      </div>
    </div>
  );
};

export default EditAlbum;
