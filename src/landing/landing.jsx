import React from 'react';
import Img1 from '../assets/Banner.png';
import Img2 from '../assets/2-div-img.png';
import {Link} from 'react-router-dom'
import {ReactComponent as Home} from '../assets/home.svg';
import {ReactComponent as Chat} from '../assets/chat.svg';
import {ReactComponent as Lock} from '../assets/lock.svg';
import './landing.css';
const Landing=()=>(
    <div className='landing'>
    <div className='img-header'>
        <img  className='img-1'src={Img1} alt='banner-pic'/>  
        <h1 className='img-1-heading'>Hi I'm Jenna</h1>
    </div>
    <div className='container-1'>
    
    <div className='container-1-1'> 
    <img  className='img-2'src={Img2} alt='banner-pic'/>
    <h1 className='img-2-heading'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hendrerit ut massa metus.Lorem ip</h1>
    </div>
   <Link to="/register"><button className='btn-chat'>Chat now @ Rs 2000/-</button></Link> 
    </div>
    <div className='container-2'>
        <h1 className='container-2-head'>Lets connect</h1>

    </div>
    <div className='icons-tab'>
        <Home/>
      
        <Chat/>
        
        <Lock/>
    </div>


    </div>
)
export default Landing;