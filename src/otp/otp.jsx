import React,{useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './otp.css'
const Otp=()=>{
    const {phone}=useParams();
    const [code1,setCode1]=useState("");
    const [code2,setCode2]=useState("");
    const [code3,setCode3]=useState("");
    const [code4,setCode4]=useState("");
    const postData=async(e)=>{
        e.preventDefault();
        try {
           if(code1.trim()&&code1.trim().length==1 && code2.trim()&&code2.trim().length==1 && code3.trim()&&code3.trim().length==1 && code4.trim()&&code4.trim().length==1){
             const code=code1+code2+code3+code4;   
            const config={
                   headers:{
                     "Content-Type":"application/json"
                   }
                 }
                 await axios.post("/api/user/public/verify",{phone,code},config)
                  alert("Login Successfull");
                 
               }
           else{
               alert("Something went wrong Please try again later!");
           }
        } catch (error) {
            console.log(error);
        }
    }
    return(
<div className="otp">
<h2 className='otp-head'>Enter OTP</h2>
<form className="otp-num-form">
    <div className='otp-num'>
    <input  className="otp-num-inp1" type="tel" value={code1} onChange={(e)=>setCode1(e.target.value)}></input>
    <input  className="otp-num-inp2" type="tel" value={code2} onChange={(e)=>setCode2(e.target.value)}></input>
    <input  className="otp-num-inp3" type="tel" value={code3} onChange={(e)=>setCode3(e.target.value)}></input>
    <input  className="otp-num-inp4" type="tel" value={code4} onChange={(e)=>setCode4(e.target.value)}></input>   
    </div>
    <h6 className='resend-txt'>Resend OTP <span className='timer'>0:50</span></h6>

    <button className="btn"  type="submit" onClick={postData}>Log In</button>
</form>
</div>
    )}
export default Otp; 