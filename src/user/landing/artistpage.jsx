import React, { useEffect, useState } from 'react';
import Img1 from '../.././assets/Banner.png';
import Img2 from '../.././assets/2-div-img.png';
import AlbumImg1 from '../.././assets/Group 33907.png';
import AlbumImg2 from '../.././assets/Group 33906.png';
import AlbumImg3 from '../.././assets/Group 33945.png';

import 'swiper/swiper.min.css'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import SwiperCore, {
  Pagination
} from 'swiper';

import API from '../../api';
import {Link,useParams,useNavigate,useLocation} from 'react-router-dom'
import {ReactComponent as HomeB} from '../.././assets/home.svg';
import {ReactComponent as Chat} from '../.././assets/chat.svg';
import {ReactComponent as Lock} from '../.././assets/lock.svg';
import {ReactComponent as Wallet} from '../.././assets/wallet.svg';
import {ReactComponent as Bell} from '../.././assets/bell.svg';
import {ReactComponent as User} from '../.././assets/userlogin.svg'; 
import {ReactComponent as Clock} from '../.././assets/clock.svg'; 
import {ReactComponent as Home} from '../.././assets/home-white.svg'; 
import {ReactComponent as ChatB} from '../.././assets/chat-black.svg'; 
import {ReactComponent as LockB} from '../.././assets/lock-black.svg'; 

import './landing.css';
SwiperCore.use([Pagination]);
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
    const [timestamp,setTimestamp]=useState("");
    const [startClock,setStartClock]=useState(false);
    const location=useLocation();
    const [albumId,setAlbumId]=useState(location.state);
    const [home,setHome]=useState(1);
    const [chat,setChat]=useState(0);
    const [lock,setLock]=useState(0);
    useEffect(()=>{
        const config={
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${localStorage.getItem("fanstarToken")}`
          }
      
        }
       API.get(`/api/user/private/getartist/${id}`,config).then(({data})=>{
           setName(data.username);
           setProfilePhoto(data.profilePhoto);
           setBio(data.bio);
        
       })
       API.get(`/api/user/public/getservices/${id}`,config).then(({data})=>{
        setServices(data);
     
    })
    API.get(`/api/user/public/getalbums/${id}`,config ).then(({data})=>{
      setAlbum(data);
      // console.log("access",data);
      
      const arr=[];
      for(let i=0;i<data.length;i++){
        API.get(`/api/user/private/readimage/${data[i].fileUrl}`,config).then((res)=>{
        // console.log(res.data);
        arr.push(res.data);
       
        // setPhotos([...photos,res.data])
          // console.log("response");
        })
        
      }
      setPhotos(arr);
      //  console.log("arr");
      //  console.log(arr);
        // setPhotos([...photos,res.data])
        
    
    }
    
    
    ) 
    if(albumId){
       console.log(albumId,"state");
     API.get(`/api/user/private/getalbumtimestamp/${albumId}`,config).then((res)=>{
      setTimestamp(new Date().getTime());
      setStartClock(true);
      // console.log((new Date().getTime()-new Date(res.data).getTime())/1000);
      // API.put('/api/user/private/removealbumaccess',{albumId:state},config);
    //   console.log(new Date());
    //  console.log(new Date(res.data))
     })
    }


      },[])
      useEffect(() => {
        if( seconds > 0 && startClock){
          setTimeout(() => setSeconds(seconds - 1), 1000);
        }else if(seconds<=0 && startClock){
          removeAccess();
          setStartClock(false);
        }
    
      }, [seconds,startClock]);
      
      const chatHandler=async()=>{

     try{
      const config={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("fanstarToken")}`
        }
    
      }
    const {data}=await API.get('/api/user/private/getowndetails',config)

      const res=await API.post('/api/chat/createchat',{user1:data._id,user2:id},{
        headers:{
           "Content-Type":"application/json"
        }});
navigate('/user/chat',{state:{userId:data._id,roomId:res.data,id:id}});
}
  
catch(error){
console.log(error);
}
       
      } 
    const removeAccess=async()=>{
      const config={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("fanstarToken")}`
        }
    
      }
     try{
       await  API.put('/api/user/private/removealbumaccess',{albumId},config);
         

          navigate(`/artist/${id}`,{state:""});
     }
     catch(error){
         console.log(error);
     }
    }
 
    // console.log(location,"location");
    return(
    <div className='landing'>
    <div className='img-header'>
        <img  className='img-1'src={Img1} alt='banner-pic'/> 
        
        {localStorage.getItem("fanstarToken")
        ?
        <Link to='/wallet'><Wallet className='wallet-icon'/>
        
        </Link>
            
        :<div  onClick={()=>navigate('/login',{state:{artistid:id}})}>
          <User className='wallet-icon' />
        <text id="login-text-land" >Login</text>
        </div> }
        <Link to={`/artist/${id}/sub`}><Bell className='bell-icon'> </Bell></Link>
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
       
         
            <div>  
            <div className='card'>
         
            {/* <div className='card-1'></div> */}
            <Swiper pagination={{
            "dynamicBullets": true
          }} className="mySwiper">
  {services.length>0&&
    services.map((data)=>{
        return(
  <SwiperSlide>

  <div className='card-2'onClick={()=>{
                navigate(`/artist/${id}/user/service/${data._id}`)
             }} > <text id="service-txt-landing">{data.serviceName}</text></div>
           
  </SwiperSlide>
      )
    })
    
}      
  </Swiper>
 

            {/* <div className='card-3'></div> */}
            
           
        </div>
        </div>
    
 
   </div>
   <div className='container-2'> 
        <h1 className='container-2-head'>My Images <span id="see-all" style={{cursor:"pointer"}} onClick={()=>{navigate(`/artist/${id}/user/album`,{state:albumId})}}>See All</span></h1>
        <div className='time-cont'> 
        {
        
        (new Date().getTime()-timestamp)/1000 <=120 ? //condition
      <div>  <Clock id="clock-svg"/> <span id='timer-clock'> {seconds} sec</span>
       <div className='album-card'>
        {album.length>0 && album.slice(0,3).map((data,ind)=>{
         
         return(
            
          <div>
          <div className='album-card-1' key={ind}>
           
            <img className="album-card-img" src={`https://fanstar.s3.us-east-2.amazonaws.com/${data.fileUrl}`} style={{webkitFilter: `${data.accessedBy.length>0?"blur(0px)":"blur(10px)"}`, 
filter: `${data.accessedBy.length>0?"blur(0px)":"blur(10px)"}`
}} />
           
           </div>
        </div>
         
        )
        }
        )}
        {/* <button onClick={removeAccess}>Remove</button> */}
           </div>  
      
      
      
      
      
      </div>
        :
        <div>
         <div className='album-card'>
        {album.length>0 && album.slice(0,3).map((data,ind)=>{
         
          return(
            
            <div>
            <div className='album-card-1' key={ind}>
             <div id="album-img-btn">
             <button id="unlock-btn" onClick={()=>{
               
               navigate(`/artist/${id}/user/album/${data._id}`)
                
             }} > Unlock now</button>
              <img className="album-card-img" src={`https://fanstar.s3.us-east-2.amazonaws.com/${data.fileUrl}`} style={{webkitFilter: "blur(10px)", 
  filter: "blur(10px)"
}}  />
              
             </div>
             </div>
          </div>
           
          )
        }
        )}
        
           </div>

        </div>
        }
        
        
        {/* <button onClick={removeAccess}>Remove</button> */}
      
        </div>
       
            
          
            {/* <div className='album-card-2'><img className="album-card-img" src={AlbumImg2}/></div>
            <div className='album-card-3'><img className="album-card-img" src={AlbumImg3}/></div> */}
        
        
        
    
    

   </div>
    
        {(() => {
        if (home==1 &&chat==0&&lock==0) {
          return (
            <div>
              <div className='icons-tab'>
        <div className='nav'>
        <HomeB/>
      
      <Chat onClick={()=>{setChat(1);setHome(0);chatHandler()}}/>

      <Lock onClick={()=>{setLock(1);setHome(0);navigate(`/artist/${id}/sub`)}} />
          </div>
          </div>
             


            </div>
          )
        } else if (chat==1&&home==0&&lock==0) {
          return (
            <div>
              <div className='icons-tab'>
        <div className='nav'>
        <Home onClick={()=>{setHome(1);setChat(0)}}  />
      
      <ChatB/>
      
      <Lock onClick={()=>{setLock(1);setChat(0);navigate(`/artist/${id}/sub`)}}/>
          </div>
          </div>
      


            </div>
          )
        } else if(lock==1&&chat==0&&home==0) {
          return (
            <div>
              <div className='icons-tab'>
        <div className='nav'>
        <Home onClick={()=>{setHome(1);setLock(0);navigate(`/artist/${id}`)}}/>
      
      <Chat onClick={()=>{setChat(1);setLock(0);chatHandler()}}/>
      
      <LockB/>
          </div>
          </div>
       


            </div>
          )
        }
      })()}
        
        
        
        


    </div>
    )
}
export default ArtistPage;