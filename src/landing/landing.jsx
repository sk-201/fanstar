import React from 'react';
import Img1 from '../assets/Banner.png';
import Img2 from '../assets/2-div-img.png';
import './landing.css';
const Landing=()=>(
    <div className='landing'>
    <div className='img-header'>
        <img  className='img-1'src={Img1} alt='banner-pic'/>
        <h1 className='img-1-heading'>Hi I'm Jenna</h1>
    </div>
    <div className='container-2'>
    <img  className='img-2'src={Img2} alt='banner-pic'/>
    <h2 className='img-2-heading'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hendrerit ut massa metus.Lorem ip</h2>
    </div>
    <div></div>
    <div></div>


    </div>
)
export default Landing;