import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Img1 from '../.././assets/Banner.png';
import Img2 from '../.././assets/2-div-img.png';
import AlbumImg1 from '../.././assets/Group 33907.png';
import AlbumImg2 from '../.././assets/Group 33906.png';
import AlbumImg3 from '../.././assets/Group 33945.png';
import {Link,useParams,useNavigate} from 'react-router-dom'
import {ReactComponent as Home} from '../.././assets/home.svg';
import {ReactComponent as Chat} from '../.././assets/chat.svg';
import {ReactComponent as Lock} from '../.././assets/lock.svg';
import {ReactComponent as Wallet} from '../.././assets/wallet.svg';
import {ReactComponent as Bell} from '../.././assets/bell.svg';
import {ReactComponent as User} from '../.././assets/userlogin.svg'; 
import {ReactComponent as Clock} from '../.././assets/clock.svg'; 

import './landing.css';
const ArtistPage=()=>{
  const navigate=useNavigate();
    const {id}=useParams();
    const [seconds, setSeconds] = useState(120);
    const[name,setName]=useState("");
    const[bio,setBio]=useState("");
    const[profilePhoto,setProfilePhoto]=useState("");
    const [services,setServices]=useState([]);
    const [album,setAlbum]=useState([]);
    const[photos,setPhotos]=useState([]);
    
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
        
       })
       axios.get(`/api/user/public/getservices/${id}`,config).then(({data})=>{
        setServices(data);
     
    })
    axios.get(`/api/user/public/getalbums/${id}`,config ).then(({data})=>{
      setAlbum(data);
      // console.log("data");
      // console.log(data);
      const arr=[];
      for(let i=0;i<data.length;i++){
        axios.get(`/api/user/private/readimage/${data[i].fileUrl}`,config).then((res)=>{
        console.log(res.data);
        arr.push(res.data);
        // setPhotos([...photos,res.data])
          console.log("response");
        })
        
      }
      setPhotos(arr);
      //  console.log("arr");
      //  console.log(arr);
        // setPhotos([...photos,res.data])
        
    
    }
    ) 

      },[])
      useEffect(() => {
        seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000);
    
      }, [seconds]);
    
    return(
    <div className='landing'>
    <div className='img-header'>
        <img  className='img-1'src={Img1} alt='banner-pic'/> 
        
        {localStorage.getItem("fanstarToken")
        ?
        <Link to='/wallet'><Wallet className='wallet-icon'/>
        
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
   <div className='container-2'> 
        <h1 className='container-2-head'>My Images <span id="see-all" style={{cursor:"pointer"}} onClick={()=>{navigate(`/artist/${id}/user/album`)}}>See All</span></h1>
        <div className='time-cont'> 
        <Clock id="clock-svg"/> <span id='timer-clock'> {seconds} sec</span>
        
      
      
        </div>
        <div className='album-card'>
        {album.length>0 && album.map((data,ind)=>{
          return(
            
            <div>
            <div className='album-card-1' key={ind}><img className="album-card-img" src={`data:image/png;base64, ${photos.length>0 && photos[ind]}`}  onClick={()=>{
                navigate(`/artist/${id}/user/album/${data._id}`)
             }}/></div>
          </div>
           
          )
        }
        )}
           </div>  
            
          
            {/* <div className='album-card-2'><img className="album-card-img" src={AlbumImg2}/></div>
            <div className='album-card-3'><img className="album-card-img" src={AlbumImg3}/></div> */}
        
        
        
    
    

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