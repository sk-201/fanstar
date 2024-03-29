import React,{useEffect,useState} from "react";
import { useParams,useNavigate,useLocation } from "react-router-dom";
import {ReactComponent as Clock} from '../.././assets/clock.svg'; 
import {ReactComponent as Home} from '../.././assets/home-white.svg'; 
import {ReactComponent as ChatB} from '../.././assets/chat-black.svg'; 
import {ReactComponent as LockB} from '../.././assets/lock-black.svg'; 
import {ReactComponent as HomeB} from '../.././assets/home.svg';
import {ReactComponent as Chat} from '../.././assets/chat.svg';
import {ReactComponent as Lock} from '../.././assets/lock.svg';
import API from "../../api";
import '../landing/landing.css';
const Album=()=>{
  const [home,setHome]=useState(0);
  const [chat,setChat]=useState(0);
  const [lock,setLock]=useState(1);
    const navigate=useNavigate();
    const {id}=useParams();
    const [seconds, setSeconds] = useState(120);
    const [album,setAlbum]=useState([]);
    const[photos,setPhotos]=useState([]);
    const [timestamp,setTimestamp]=useState("");
    const [startClock,setStartClock]=useState(false);
    const location=useLocation();
    const [albumId,setAlbumId]=useState(location.state);



    useEffect(()=>{
        const config={
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${localStorage.getItem("fanstarToken")}`
          }
      
        }
    API.get(`/api/user/public/getalbums/${id}`,config ).then(({data})=>{
      setAlbum(data);
      const arr=[];
      for(let i=0;i<data.length;i++){
        API.get(`/api/user/private/readimage/${data[i].fileUrl}`,config).then((res)=>{
      //  console.log(res.data);
      //  console.log("res");
        arr.push(res.data);
        
        // setPhotos([...photos,res.data])
        
        })
      

      }
      // console.log(arr);
      setPhotos(arr);

        // setPhotos([...photos,res.data])
        
    
    }
    ) 
    if(albumId){
      // console.log(albumId,"state");
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





    return(
      <div className='container-2'> 
      <h1 className='container-2-head'>My Images <span id="see-all" style={{cursor:"pointer"}} onClick={()=>{navigate(`/artist/${id}/user/album`)}}>See All</span></h1>
      <div className='time-cont'> 
      {
      
      (new Date().getTime()-timestamp)/1000 <=120 ? //condition
    <div>  <Clock id="clock-svg"/> <span id='timer-clock'> {seconds} sec</span>
     <div className='album-card'>
      {album.length>0 && album.map((data,ind)=>{
       
       return(
          
        <div>
        <div className='album-card-1' key={ind}><img className="album-card-img" src={`https://fanstar.s3.us-east-2.amazonaws.com/${data.fileUrl}`} style={{webkitFilter: `${data.accessedBy.length>0?"blur(0px)":"blur(10px)"}`, 
filter: `${data.accessedBy.length>0?"blur(0px)":"blur(10px)"}`
}}/></div>
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
      {album.length>0 && album.map((data,ind)=>{
       
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
      

    
      </div>
      {(() => {
        if (home==1 &&chat==0&&lock==0) {
          return (
            <div>
              <div className='icons-tab'>
        <div className='nav'>
        <HomeB/>
      
      <Chat onClick={()=>{setChat(1);setHome(0);navigate("/chat")}}/>

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
      
      <Chat onClick={()=>{setChat(1);setLock(0);}}/>
      
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
export default Album;