import React from 'react';
import {ReactComponent as BackArrow} from '../../assets/backArrow.svg';
import './add-service.css';
const AddService=()=>(
    <div className='add-service'>
        <BackArrow id="bck-arrow"/>
        <span id="add-service-text">Add Service</span>
        <div className='add-service-form'>
        <form>
        <label for="serv-name"> Service Name</label>
         <input id="serv-name" type="text" className='inp-add' placeholder='typing...'/>
         <label for="total-amt"> Total Amount</label>
         <input id="total-amt" type="text"className='inp-add'placeholder='Rs'/>
         <label for="serv-desc"> Service Description</label>
         <input id="serv-desc" type="text"className='inp-add'placeholder='typing...'/>
         <button id="btn-add-service">Add Service</button>
         
        </form>
        </div>
    </div>
)
export default AddService;