import React from 'react';
import './otp.css'
const Otp=()=>(
<div className="otp">
<h2 className='otp-head'>Enter OTP</h2>
<form className="otp-num">
    <input  className="otp-num-inp1" type="tel"></input>
    <input  className="otp-num-inp2" type="tel"></input>
    <input  className="otp-num-inp3" type="tel"></input>
    <input  className="otp-num-inp4" type="tel"></input>   
</form>
<h6 className='resend-txt'>Resend OTP
<span className='timer'>0:50</span>
</h6>

    <button className="btn">Log In</button>
</div>
)
export default Otp; 