import React from 'react';
import Img1 from '../.././assets/Banner.png';
import Img2 from '../.././assets/2-div-img.png';
import {Link} from 'react-router-dom'
import {ReactComponent as Home} from '../.././assets/home.svg';
import {ReactComponent as Chat} from '../.././assets/chat.svg';
import {ReactComponent as Lock} from '../.././assets/lock.svg';
import {ReactComponent as Wallet} from '../.././assets/wallet.svg';
import {ReactComponent as Bell} from '../.././assets/bell.svg'; 
import './landing.css';
const Landing=()=>(
    <div className='landing'>
    <div className='img-header'>
        <img  className='img-1'src={Img1} alt='banner-pic'/>  
        <Link to='/balance'><Wallet className='wallet-icon'/></Link>
        <Link to='/sub'><Bell className='bell-icon'> </Bell></Link>
        <h1 className='img-1-heading'>Hi I'm Jenna</h1>
    </div>
    <div className='container-1'>
    
    <div className='container-1-1'> 
    <img  className='img-2'src={Img2} alt='banner-pic'/>
    <h1 className='img-2-heading'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hendrerit ut massa metus.Lorem ip</h1>
    </div>
   <Link to="/register" style={{textDecoration:"none"}}><button className='btn-chat' >Chat now @ Rs 2000/-</button></Link> 
    </div>
    <div className='container-2'>
        <h1 className='container-2-head'>Lets connect</h1>
        <div className='card'>
            <div className='card-1'></div>
            <div className='card-2'>I will promote your brand on my <br/>instagram</div>
            <div className='card-3'></div>
        </div>

    </div>
    <div className='icons-tab'>
        <div className='nav'>
        <Home/>
      
      <Chat/>
      
      <Lock/>
        </div>
   
    </div>


    </div>
)
export default Landing;