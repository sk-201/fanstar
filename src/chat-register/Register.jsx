import React from 'react';
import Ban from '../assets/register-banner.png';
import './Register.css';

const Register=()=>(
    <div className='Register'>
     <div className='img-banner'>
      <img src={Ban} alt="banner-img"/>     
     </div>
     <div>
         <h1>Product Type</h1>
         <h2 className='pers-text'>Personalised Services</h2>
         <h6 className='pers-text-h'> I will promote your brand on my <br/> instagram</h6>
         <h1>Final Amount:</h1>
         <h6>Rs2000/-</h6>
     </div>
     <form className='form-input'>
         <input type="text" placeholder='Enter name' />
         <input type="email" placeholder='Enter email'/>
         <input type="text" placeholder='Enter phone number'/>
         <input type="text" placeholder='@Instagram Handle'/>
         <button className='btn-pay'>Pay Rs 2000/-</button>
     </form>
     <text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hendrerit ut massa metus.Lorem ipLorem ipsum <span>Read more </span></text>
    </div>
)
export default Register;