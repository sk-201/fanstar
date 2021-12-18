import React from 'react';
import Otp from '../otp/otp';
import './resend.css';
const Resend=()=>(
    <div className='resend'>
     <h2 className='resend-head'>Confirm your Phone no</h2>
     <div className="inputs-re">
<input className="input-no-re" type="tel" placeholder="Phone Number"/>
<h6 className='msg-no-re'>Enter your phone number</h6>
</div>

     
     <Otp/>   

    </div>
)
export default Resend;