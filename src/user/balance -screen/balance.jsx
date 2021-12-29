import React from 'react';
import { Link } from 'react-router-dom';
import './balance .css';
const Balance=()=>(
<div className='balance'>
    <div className='balance-screen'>
     <h1 id="bal-sc-head">My Balance <span id="curr">INR</span></h1>
     
     <text id="bal-sc-bal">Rs2500.00</text>
    </div>
    <div className='bal-recharge'>
        <Link style={{textDecoration:"none"}} to="#" id='bal-re'>Recharge your Wallet</Link>
        <span className='bal-re-subhead'>Min recharge 100/-</span>
    </div>
    <div className='prod-details'>
     <h1 id="prod-type">Product Type :</h1>
     <span id="pers-ser">Personalised Service</span>
     <span id="i-promote">I will promote your brand on my <br/>Instagram</span>
    
    </div>
    <div className='amt-detail'>
        <h1 id="tot-amt">Total Amount</h1>
        <span id='incl'>(inclusive of all charges)</span>
        <span id='price'>Rs 299/-</span>
        <button className='btn-pay'>Pay with Wallet</button>

    </div> 

</div>
)
export default Balance;