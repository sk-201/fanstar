import React,{ useState } from 'react';
import API from '../../api';
import { useParams,useNavigate } from 'react-router-dom';
import Ban from '../.././assets/register-banner.png';
import Back from '../.././assets/Rectangle 736.png';
import {ReactComponent as Home} from '../.././assets/home-white.svg'; 
import {ReactComponent as ChatB} from '../.././assets/chat-black.svg'; 
import {ReactComponent as LockB} from '../.././assets/lock-black.svg'; 
import {ReactComponent as HomeB} from '../.././assets/home.svg';
import {ReactComponent as Chat} from '../.././assets/chat.svg';
import {ReactComponent as Lock} from '../.././assets/lock.svg';
import './subscriptions.css';
const Subscribe=()=>{
  const [home,setHome]=useState(0);
  const [chat,setChat]=useState(0);
  const [lock,setLock]=useState(1);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const {id}=useParams(); 
  const navigate=useNavigate();
    return(
        <div className='subscription-main'>
            <img  className='back-img' src={Back} alt="background-img"/>
            <div className='subscription-container'>
                <h1 className="sub-head">Subscriptions</h1>
                <div className='subscription-main-2'>
                    <div className='img-container'>  <img  id="ban-img" src={Ban} alt="banner-img"/>  </div>
                
                <h1 id="sub-main-con">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hendre</h1>
                <input className='inp-sub'  type="text" placeholder= 'Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                <input className='inp-sub' type="email"placeholder='E-mail ID' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input  className='inp-sub' type="tel" placeholder='Phone-no' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
             <button className='btn-sub' onClick={()=>{
            if(name.trim()==""||email.trim()==""||phone.trim()==""){
              alert("One or more Field is empty!!");
            }
            else{
           navigate(`/artist/${id}/subscribe/payment`,{state:{name,email,phone}})
            }
        }}>Pay Rs 500/-</button> 
             
             
             
             
             
             
                </div>

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
export default Subscribe;