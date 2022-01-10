import React from 'react';
import  Logo from '../../assets/Ellipse 58.png';
import {ReactComponent as Home} from '../.././assets/home.svg';
import {ReactComponent as Chat} from '../.././assets/chat.svg';
import {ReactComponent as Lock} from '../.././assets/lock.svg';
import {ReactComponent as User} from '../../assets/chatuser.svg';
import './chatscreen.css';
const ChatList=()=>{
    return(
        <div className='chat'>
          <div className='img-cont-inc' style={{paddingTop:"1rem"}}>
         <span id='fanstar'>Fanstar logo</span>
       
        </div>
        <img id='logo-img' src={Logo}/>
        <div className='chat-container'>
          <span className="chat-span"> 
              <User id="user-icon"/>
            <text id="chat-name">Kiran</text>
            <text id="chat-ch">Hello karthik..... how are you <text id="chat-time">7:44pm</text></text>
          </span>
          <span className="chat-span"> 
              <User id="user-icon"/>
            <text id="chat-name">Kiran</text>
            <text id="chat-ch">Hello karthik..... how are you <text id="chat-time">7:44pm</text></text>
          </span>
          <span className="chat-span"> 
              <User id="user-icon"/>
            <text id="chat-name">Kiran</text>
            <text id="chat-ch">Hello karthik..... how are you <text id="chat-time">7:44pm</text></text>
          </span>
          <span className="chat-span"> 
              <User id="user-icon"/>
            <text id="chat-name">Kiran</text>
            <text id="chat-ch">Hello karthik..... how are you <text id="chat-time">7:44pm</text></text>
          </span>
          <span className="chat-span"> 
              <User id="user-icon"/>
            <text id="chat-name">Kiran</text>
            <text id="chat-ch">Hello karthik..... how are you <text id="chat-time">7:44pm</text></text>
          </span>
          <span className="chat-span"> 
              <User id="user-icon"/>
            <text id="chat-name">Kiran</text>
            <text id="chat-ch">Hello karthik..... how are you <text id="chat-time">7:44pm</text></text>
          </span>
          <span className="chat-span"> 
              <User id="user-icon"/>
            <text id="chat-name">Kiran</text>
            <text id="chat-ch">Hello karthik..... how are you <text id="chat-time">7:44pm</text></text>
          </span>
          <span className="chat-span"> 
              <User id="user-icon"/>
            <text id="chat-name">Kiran</text>
            <text id="chat-ch">Hello karthik..... how are you <text id="chat-time">7:44pm</text></text>
          </span>
          <span className="chat-span"> 
              <User id="user-icon"/>
            <text id="chat-name">Kiran</text>
            <text id="chat-ch">Hello karthik..... how are you <text id="chat-time">7:44pm</text></text>
          </span>
          <span className="chat-span"> 
              <User id="user-icon"/>
            <text id="chat-name">Kiran</text>
            <text id="chat-ch">Hello karthik..... how are you <text id="chat-time">7:44pm</text></text>
          </span>
          <span className="chat-span"> 
              <User id="user-icon"/>
            <text id="chat-name">Kiran</text>
            <text id="chat-ch">Hello karthik..... how are you <text id="chat-time">7:44pm</text></text>
          </span>
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
export default ChatList;