import React from 'react';
import  Logo from '../../assets/Ellipse 58.png';
import './employee-profile.css'
const EmployeeProfile=()=>{
    return(
        <div className='employee-profile'>
          <div className='img-cont-inc' style={{paddingTop:"1rem"}}>
         <span id='fanstar'>Fanstar logo</span>
       
        </div>
        <img id='logo-img' src={Logo}/>
        <div className='upper-container'>
       
        </div>
        <div className='main-container'>

        </div>

        </div>
    )
    
    
}
export default EmployeeProfile;