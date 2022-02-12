import React from 'react';
import API from '../../api';
import './ConfirmationScreen.css';

const ConfirmationScreen = (props) => {
  const { close, id, back, type, fileUrl, refresh } = props;

  const handleDelete = async () => {
    try {
      await API.delete(`/api/artist/private/deletealbum/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
        },
      });
      // console.log(data);
      alert('Album deleted!');
      close();
      back();
      // refresh();
    } catch (error) {
      console.log(error);
      close();
    }
  };

  const handleDeleteImage = async () => {
    try {
      await API.put(
        `/api/artist/private/removeimagefromalbum/`,
        {
          albumId: id,
          url: fileUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
          },
        }
      );
      // console.log(data);
      alert('Image deleted!');
      close();
      refresh();
    } catch (error) {
      console.log(error);
      close();
    }
  };

  return (
    <div className='album-confirmation-container'>
      <div className='album-confirmation-cardDiv'>
        <div className='album-confirmation-close'>
          <button className='album-close-confirmation' onClick={close}>
            +
          </button>
        </div>
        <div className='album-confirmation-contentDiv'>
          <p className='album-confirmation-content'>
            {`Confirm to delete this ${type === 'image' ? 'image' : 'album'}`}
          </p>
        </div>
        <button
          className='album-remove-artistBtn'
          onClick={type === 'image' ? handleDeleteImage : handleDelete}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
