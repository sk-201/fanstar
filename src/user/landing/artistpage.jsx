import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Img1 from '../.././assets/Banner.png';
import Img2 from '../.././assets/2-div-img.png';
import {Link,useParams,useNavigate} from 'react-router-dom'
import {ReactComponent as Home} from '../.././assets/home.svg';
import {ReactComponent as Chat} from '../.././assets/chat.svg';
import {ReactComponent as Lock} from '../.././assets/lock.svg';
import {ReactComponent as Wallet} from '../.././assets/wallet.svg';
import {ReactComponent as Bell} from '../.././assets/bell.svg';
import {ReactComponent as User} from '../.././assets/userlogin.svg'; 

import './landing.css';
const ArtistPage=()=>{
  const navigate=useNavigate();
    const {id}=useParams();
    const[name,setName]=useState("");
    const[bio,setBio]=useState("");
    const[profilePhoto,setProfilePhoto]=useState("");
    const [services,setServices]=useState([]);
    useEffect(()=>{
        const config={
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${localStorage.getItem("fanstarToken")}`
          }
      
        }
       axios.get(`/api/user/private/getartist/${id}`,config).then(({data})=>{
           setName(data.username);
           setProfilePhoto(data.profilePhoto);
           setBio(data.bio);
        console.log(data);
       })
       axios.get(`/api/user/public/getservices/${id}`,config).then(({data})=>{
        setServices(data);
     console.log(data);
    })

      },[])
    return(
    <div className='landing'>
    <div className='img-header'>
        <img  className='img-1'src={Img1} alt='banner-pic'/> 
        
        {localStorage.getItem("fanstarToken")
        ?
        <Link to='/balance'><Wallet className='wallet-icon'/>
        
        </Link>
            
        :<Link to='/login'><User className='wallet-icon'/>
        <text id="login-text-land" >Login</text>
        </Link>}
        <Link to='/sub'><Bell className='bell-icon'> </Bell></Link>
        <h1 className='img-1-heading'>Hi I'm {name}</h1>
    </div>
    <div className='container-1'>
    
    <div className='container-1-1'> 
    <img  className='img-2'src={profilePhoto} alt='banner-pic'/>
    <h1 className='img-2-heading'>{bio}</h1>
    </div>
   <Link to="#" style={{textDecoration:"none"}}><button className='btn-chat' >Chat now @ Rs 2000/-</button></Link> 
    </div>
    <div className='container-2'> 
        <h1 className='container-2-head'>Lets connect</h1>
        {services.length>0&&
    services.map((data)=>{
        return(
            <div>  
            <div className='card'>
            <div className='card-1'></div>
            <div className='card-2'onClick={()=>{
                navigate(`/artist/${id}/user/service/${data._id}`)
             }} > <text id="service-txt-landing">{data.serviceName}</text></div>
            <div className='card-3'></div>
        </div>
        </div>
        )
    })
    
}
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
}
export default ArtistPage;