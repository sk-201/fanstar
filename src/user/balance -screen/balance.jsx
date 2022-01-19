import React,{useEffect,useState} from 'react';
import { Link,useLocation,useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import './balance .css';
const Balance=()=>{
const {state}=useLocation();
const{artistId,serviceId}=useParams();
const {username,email,phone,insta}=state;
const [servicename,setServiceName]=useState("");
  const [serviceprice,setServicePrice]=useState("");
  const [balance,setBalance]=useState("");
  const navigate=useNavigate();
useEffect(()=>{
    const config={
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${localStorage.getItem("fanstarToken")}`
      }
  
    }
   axios.get(`/api/user/private/getaservice/${serviceId}`,config).then(({data})=>{
       setServiceName(data.serviceName);
       setServicePrice(data.amount)
    console.log(data);
   })
   axios.get(`/api/user/private/getowndetails`,config).then(({data})=>{
    setBalance(data.balance);
})
   .catch((error)=>console.log(error))
  },[])
const razorPayPaymentHandler=async()=> {
    const config={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("fanstarToken")}`
        }
    
      }
        const API_URL = `/api/user/private/`
        const orderUrl = `${API_URL}order/720`;
        const response = await axios.get(orderUrl,config);
        const { data } = response;
        console.log("App -> razorPayPaymentHandler -> data", data)
        console.log("response", response)
        
        const options = {
           key: 'razorpay-key',
          name: {username},
          description: "Buy Service",
          order_id: data.id,
          handler: async (response) => {
            try {
             const paymentId = response.razorpay_payment_id;
             const url = `${API_URL}capture/${paymentId}`;
             const captureResponse = await axios.post(url,{amount:'720'},config)
             const successObj = JSON.parse(captureResponse.data)
             const captured = successObj.captured;
             console.log("App -> razorPayPaymentHandler -> captured", successObj)
             if(captured){
                 console.log('success')
             }
             
            } catch (err) {
              console.log(err);
            }
          },
          theme: {
            color: "#686CFD",
          },
        };
        const rzp1 = new window.Razorpay(options);
        // rzp1.createPayment(options);
        rzp1.open();
      }


const buyService=async()=>{
    try{
    
        const config={
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${localStorage.getItem("fanstarToken")}`
          }
        }
       
       await axios.put('/api/user/private/buyservice',{serviceId,username,email,phone,insta},config);
        alert("Thank you for buying my service!!")
         navigate(`/artist/${artistId}`);
      }
    
    catch(error){
      alert("Not Enough Balance");
      console.log(error);
    }


    }
return(
<div className='balance'>
    <div className='balance-screen'>
     <h1 id="bal-sc-head">My Balance <span id="curr">INR</span></h1>
     
     <text id="bal-sc-bal">Rs {balance}.00</text>
    </div>
    <div className='bal-recharge'>
        <p style={{textDecoration:"none",cursor:"pointer"}}  id='bal-re' onClick={razorPayPaymentHandler}>Recharge your Wallet</p>
        <span className='bal-re-subhead'>Min recharge 100/-</span>
    </div>
    <div className='prod-details'>
     <h1 id="prod-type">Product Type :</h1>
     <span id="pers-ser">Personalised Service</span>
     <span id="i-promote">{servicename}</span>
    
    </div>
    <div className='amt-detail'>
        <h1 id="tot-amt">Total Amount</h1>
        <span id='incl'>(inclusive of all charges)</span>
        <span id='price'>Rs {serviceprice}/-</span>
        <button className='btn-pay' onClick={buyService}>Pay with Wallet</button>

    </div> 

</div>
)}
export default Balance;