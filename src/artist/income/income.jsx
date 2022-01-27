import React,{useState,useEffect} from 'react';
import API from '../../api';
import {ReactComponent as Home} from '../.././assets/home-white.svg'; 
import {ReactComponent as ChatB} from '../.././assets/chat-black.svg'; 
import {ReactComponent as LockB} from '../.././assets/lock-black.svg'; 
import {ReactComponent as HomeB} from '../.././assets/home.svg';
import {ReactComponent as Chat} from '../.././assets/chat.svg';
import {ReactComponent as Lock} from '../.././assets/lock.svg';
import  Logo from '../../assets/Ellipse 58.png';
import './income.css'
const Income=()=>{
    const [balance,setBalance]=useState();
    const [home,setHome]=useState(1);
    const [chat,setChat]=useState(0);
    const [lock,setLock]=useState(0);
    useEffect(()=>
    {
        const config={
            headers:{
              "Content-Type":"application/json",
              Authorization:`Bearer ${localStorage.getItem("fanstarToken")}`
            }
        
          }
          API.get("/api/artist/private/getownprofile",config).then(
              ({ data})=>{
                  setBalance(data.balance);
                  
              }
          ).catch(error=>console.log(error))
        
    
    }
    
    )
   
   
   
   
    return(
    <div className='income'>
         <div className='img-cont-inc'>
         <span id='fanstar'>Fanstar logo</span>
       
        </div>
        <img id='logo-img' src={Logo}/>
     <div className='main-container'>
         <span id='tot-inc-text'>Total Income</span>
         <div className='total-income'>
             <h2 id='tot-inc-text-1'>Total Income</h2>
             <h1 id='tot-inc-rs'> Rs {balance}/-</h1>

         </div>
        <span id="week-inc-text">Weekly Income</span> 
         <div className='weekly-income'>
             <h2 id="week-inc-text-1">Weekly Income</h2>
             <h1 id="week-inc-rs">Rs {balance}/-</h1>
         </div>
         <h3 id="tot-app">Total no app visits</h3>
          <h2 id='tot-app-no'>100,789</h2>
         <h3 id='tot-ord' >Total Orders</h3>
         <h2 id='tot-ord-no'>100</h2>
         <h3 id='pend-ord'>Pending Orders</h3>
         <h2 id='pend-ord-no'>10</h2>

     </div>

     {(() => {
        if (home==1 &&chat==0&&lock==0) {
          return (
            <div>
              <div className='icons-tab' style={{marginLeft:"-1.8rem"}}>
        <div className='nav'>
        <HomeB/>
      
      <Chat onClick={()=>{setChat(1);setHome(0)}}/>

      <Lock onClick={()=>{setLock(1);setHome(0)}} />
          </div>
          </div>
             


            </div>
          )
        } else if (chat==1&&home==0&&lock==0) {
          return (
            <div>
              <div className='icons-tab' style={{marginLeft:"-1.8rem"}}>
        <div className='nav'>
        <Home onClick={()=>{setHome(1);setChat(0)}}  />
      
      <ChatB/>
      
      <Lock onClick={()=>{setLock(1);setChat(0)}}/>
          </div>
          </div>
      


            </div>
          )
        } else if(lock==1&&chat==0&&home==0) {
          return (
            <div>
              <div className='icons-tab' style={{marginLeft:"-1.8rem"}}>
        <div className='nav'>
        <Home onClick={()=>{setHome(1);setLock(0)}}/>
      
      <Chat onClick={()=>{setChat(1);setLock(0)}}/>
      
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
export default Income;