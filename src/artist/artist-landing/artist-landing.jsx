import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Img1 from '../.././assets/Banner.png';
import Img2 from '../.././assets/2-div-img.png';
import {Link,useNavigate} from 'react-router-dom';
import '../../user/landing/landing.css';
import {ReactComponent as Home} from '../.././assets/home.svg';
import {ReactComponent as Chat} from '../.././assets/chat.svg';
import {ReactComponent as Lock} from '../.././assets/lock.svg';
import {ReactComponent as Edit} from '../../assets/edit-icon.svg';
import {ReactComponent as Plus} from '../../assets/plusicon.svg';
const ArtistLanding=()=>{
    const [services,setServices]=useState([]);    
    const navigate=useNavigate();
    useEffect(()=>
    {
        const config={
            headers:{
              "Content-Type":"application/json",
              Authorization:`Bearer ${localStorage.getItem("fanstarToken")}`
            }
        
          }
          axios.get("/api/artist/private/ownservices",config).then(
              ({ data})=>{
                  setServices(data);
                  console.log(data);
              }
          ).catch(error=>console.log(error))
        
    
    }
    
    )
   
   
   
   
   
   
   
    return(
   <>
    <div className='img-header'>
        <img  className='img-1'src={Img1} alt='banner-pic' />  
        <h1 className='img-1-heading' >Hi I'm Jenna
        <span id="serv-edit-txt" style={{marginLeft:'10%'}}>Edit</span>
             <Edit id="edit-icon" style={{marginRight:"-6rem"}} onClick={()=>{navigate("/edit")}}  />

        </h1>          
    </div>
    <div className='container-1'>

    <div className='container-1-1'> 
    <img  className='img-2'src={Img2} alt='banner-pic'/>
    <h1 className='img-2-heading'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hendrerit ut massa metus.Lorem ip</h1>
    </div>
   <Link to="/register" style={{textDecoration:"none"}}><button className='btn-chat' >Chat now @ Rs 2000/-</button></Link> 
    </div>
    <div className='container-2'>
        


        {services.length>0&&
    services.map((data)=>{
        return(
            <div>
             <h1 className='container-2-head'>My Services
             <span id="serv-edit-txt">
         Add
        <Plus onClick={()=>{
               navigate(`/editservice/${data._id}`)
             }} id="edit-icon"/>
        </span>
        </h1>   
      
            <div className='card'>
            <div className='card-1'></div>
            <div className='card-2'onClick={()=>{
               navigate(`/service`)
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

    </>
   )}
export default ArtistLanding;