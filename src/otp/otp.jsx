import React from 'react';
import './otp.css'
const OTP=()=>(
<div className="otp">
<h2 className='otp-head'>ENTER OTP</h2>
<div className="otp-num">
    <input  className="otp-num-inp" type="tel"></input>
    <h6 className='resend-txt'>Resend OTP</h6>
    <button className="btn">Log In</button>
</div>
</div>
)
export default OTP;