import React from 'react';
import Ban from '../assets/register-banner.png';
import Back from '../assets/Rectangle 736.png';
import './subscriptions.css';
const Subscription=()=>{
    return(
        <div className='subscription-main'>
            <img  className='back-img' src={Back} alt="background-img"/>
            <div className='subscription-container'>
                <h1 className="sub-head">Subscriptions</h1>
                <div className='subscription-main-2'>
                    <div className='img-container'>  <img  id="ban-img" src={Ban} alt="banner-img"/>  </div>
                
                <h1 id="sub-main-con">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hendre</h1>
                <select name="plans" id="choose-plan">
                <option value="volvo">1 month membership @ 599/-</option>
                <option value="saab">Plan 2</option>
                <option value="mercedes">Plan 3</option>
                </select>
                <button className='btn-sub'>Subscribe now</button>
                </div>

            </div>

        </div>
    )
}
export default Subscription;