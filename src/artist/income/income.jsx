import React from 'react';
import  Logo from '../../assets/Ellipse 58.png';
import './income.css'
const Income=()=>{
    return(
    <div className='income'>
         <div className='img-cont-inc'>
         <span id='fanstar'>Fanstar logo</span>
       
        </div>
        <img id='logo-img' src={Logo}/>
     <div className='main-container'>
         <span id='tot-inc-text'>Total Income</span>
         <div className='total-income'>
             <h2 id='tot-inc-text-1'>Total Income</h2>
             <h1 id='tot-inc-rs'>Rs 25000/-</h1>

         </div>
        <span id="week-inc-text">Weekly Income</span> 
         <div className='weekly-income'>
             <h2 id="week-inc-text-1">Weekly Income</h2>
             <h1 id="week-inc-rs">Rs 2500/-</h1>
         </div>
         <h3 id="tot-app">Total no app visits</h3>
          <h2 id='tot-app-no'>100,789</h2>
         <h3 id='tot-ord' >Total Orders</h3>
         <h2 id='tot-ord-no'>100</h2>
         <h3 id='pend-ord'>Pending Orders</h3>
         <h2 id='pend-ord-no'>10</h2>

     </div>
    </div>
    )
}
export default Income;