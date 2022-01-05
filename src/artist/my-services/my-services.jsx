import React from 'react';
import {ReactComponent as BackArrow} from '../../assets/backArrow.svg';
import {ReactComponent as Edit} from '../../assets/edit-icon.svg';
import './my-services.css';
const MyService =()=>(
<div className='my-service'>
<BackArrow id="bck-arrw"/>
<span id="my-service-text">My Services</span>
<span id="serv-edit-txt">Edit</span>
<Edit  id="edit-icon"/>
<div className='my-service-container'>
    <h2 id="serv-name">Service Name</h2>
    <h3 id="per-serv">Personalised Services</h3>
    <p id="serv-name-details">I will promote your brand on my instagram</p>
    <h2 id="serv-tot-amt">Total Amount</h2>
    <h3 id="tot-amt-details">Rs 599/-</h3>
    <h2 id="serv-desc">Service Description</h2>
    <p id="serv-desc-details">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hendrerit ut massa metus.Lorem ipLorem ipsum dolor sit amet, consectetur adipiscing elit. Hendrerit ut massa metus.Lorem ip</p>

</div>
</div>
)
export default MyService;