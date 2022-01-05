import React,{useState} from 'react';
import {ReactComponent as BackArrow} from '../../assets/backArrow.svg';
import './add-image.css'
const AddImage=()=>{
    const [selectedFile, setSelectedFile] = useState(null);
return(
<div className='add-image'>
<BackArrow id="bck-arrw"/>
<span id="my-service-text">Add Image</span>
<span id="post-img-text">Post</span>
<div className='add-img-cont'>
<form>
<input
          type="file"
          value={selectedFile}
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className='inp-add-img'
        />
         <label for="add-caption"> Add Caption</label>
         <input id="add-caption" type="text" className='inp-add-img' placeholder='typing...'/>
         <label for="img-price" > Add Price</label>
         <input id="img-price" type="text"className='inp-add-img'placeholder='Rs'/>
       
         
</form>
</div>
</div>
)}
export default AddImage;