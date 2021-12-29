import React from 'react';
import { Link } from 'react-router-dom';
import Ban from '../.././assets/register-banner.png';
import Back from '../.././assets/Rectangle 736.png';
import './subscriptions.css';
const Subscribe=()=>{
    return(
        <div className='subscription-main'>
            <img  className='back-img' src={Back} alt="background-img"/>
            <div className='subscription-container'>
                <h1 className="sub-head">Subscriptions</h1>
                <div className='subscription-main-2'>
                    <div className='img-container'>  <img  id="ban-img" src={Ban} alt="banner-img"/>  </div>
                
                <h1 id="sub-main-con">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hendre</h1>
                <input className='inp-sub'  type="text" placeholder= 'Name'/>
                <input className='inp-sub' type="email"placeholder='E-mail ID'/>
                <input  className='inp-sub' type="tel" placeholder='Phone-no'/>
             <Link to="/subscribe" style={{textDecoration:"none"}}><button className='btn-sub'>Pay Rs 500/-</button></Link>   
                </div>

            </div>

        </div>
    )
}
export default Subscribe;