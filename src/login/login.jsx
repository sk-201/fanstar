import React from 'react';
import Header from '../header/header.component';
import './login.css';
 const Login=()=>{
return(   
<div className="login-main">
    <Header/>
<h2 className='login-heading'>Login </h2>
<div className="inputs">
<input className="input-no" type="tel" placeholder="Enter your phone no"/>
<h6 className='msg-no'>Please Enter your phone number</h6>
<button className="btn-nxt">Next</button>
</div>
</div>
)};
export default Login;