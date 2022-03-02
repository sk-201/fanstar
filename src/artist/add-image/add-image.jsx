import React, { useState } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';
import backArrow from '../../assets/backArrow.svg';
import './add-image.css';
const AddImage = () => {
  const navigate = useNavigate();
  const [baseImage, setBaseImage] = useState('');
  const [isImage, setIsImage] = useState(false);
  const [caption, setCaption] = useState('');
  const [price, setPrice] = useState('');
  const [fileStore, setFileStore] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    // const file = e.target.files[0];
    // console.log(file);
    // const base64 = await convertBase64(file);
    // setBaseImage(base64);
    // if (e.target.files[0].type.include('video')) {
    //   setIsImage(false);
    // }
    setFileStore(e.target.files[0]);
    setBaseImage(URL.createObjectURL(e.target.files[0]));
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const sendImage = async (e) => {
    e.preventDefault();

    if (fileStore) {
      console.log(fileStore.size / 1000000);
      if (fileStore.size / 1000000 <= 50) {
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('fanstarToken')}`,
            },
          };
          if (caption === '' && price === '') {
            alert('Caption or Price is empty');
          } else {
            const data = new FormData();
            data.append('caption', caption);
            data.append('price', price);
            data.append('artistFile', fileStore);
            setLoading(true);
            await API.post('/api/artist/private/uploadimage', data, config);
            setLoading(false);
            alert('Image Uploaded!');
            navigate('/artist/landing');
          }
          // console.log(fileStore);
        } catch (error) {
          alert('Something went wrong!');
          console.log(error);
        }
      } else {
        alert('Image or video size is exceeding the image (max size 50mb)');
      }
    } else {
      alert('Please add image or video.');
    }
  };
  return (
    <div className='add-image'>
      <div className='addImage-headerDiv'>
        <div className='addImage-tileDiv'>
          <button
            className='bck-arrwBtn'
            onClick={() => navigate('/artist/landing')}
          >
            <img src={backArrow} alt='back' className='addImage-backIcon' />
          </button>
          <h3 className='addImage-title'>Add Image Or Video</h3>
        </div>
        <div className='addImage-postBtnDiv'>
          <button
            className='addImage-postBtn'
            onClick={sendImage}
            disabled={loading}
          >
            Post
          </button>
        </div>
      </div>
      {loading ? (
        <h3 className='artistChatlist-loading'>Posting...</h3>
      ) : (
        <div className='add-img-cont'>
          <div>
            {baseImage && isImage ? (
              <img id='added-img' src={baseImage} />
            ) : (
              <div>
                <input
                  type='file'
                  accept='image/*, video/*'
                  onChange={uploadImage}
                  className='inp-add-img'
                />
              </div>
            )}
          </div>
          <label for='add-caption'> Add Caption</label>
          <input
            id='add-caption'
            type='text'
            className='inp-add-img'
            placeholder='typing...'
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <label for='img-price'> Add Price</label>
          <input
            id='img-price'
            type='text'
            className='inp-add-img'
            placeholder='Rs'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};
export default AddImage;
