import React from 'react';
import './login.css';
import  Logo from '../assets/Ellipse 58.png';
 const Login=()=>{
return(   
<div className="login-main">
 <div className='img-container'>
     <img className='logo' src={Logo} alt='fanstar-logo'/>
      <h4 className='logo-sub-head'>Fanstar logo</h4>
     </div>   
<h2 className='login-heading'>Login </h2>
<div className="inputs">
<input className="input-no" type="tel" placeholder="Enter your phone no"/>
<h6 className='msg-no'>Please Enter your phone number</h6>
<button className="btn-nxt">Next</button>
</div>
</div>
)};
export default Login;