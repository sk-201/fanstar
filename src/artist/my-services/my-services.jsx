import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {ReactComponent as BackArrow} from '../../assets/backArrow.svg';
import {ReactComponent as Edit} from '../../assets/edit-icon.svg';
import './my-services.css';
import { useState,useEffect } from 'react';
const MyService =()=>{
const [services,setServices]=useState([]);    
const [Name,setName]=useState("");
const [Amount,setAmount]=useState("");
const [Description,setDescription]=useState("");
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
const navigate=useNavigate();

return(
<div className='my-service'>
<BackArrow id="bck-arrw"/>
<span id="my-service-text">My Services</span>


<div className='my-service-container'>
    {services.length>0&&
    services.map((data)=>{
        return(
            <div key={data._id}> 
           <span id="serv-edit-txt">Edit</span>
             <Edit onClick={()=>{
               navigate(`/editservice/${data._id}`)
             }} id="edit-icon"/>
            <h2 id="serv-name">Service Name</h2>
            <h3 id="per-serv">Personalised Services</h3>
            <p id="serv-name-details">{data.serviceName}</p>
            <h2 id="serv-tot-amt">Total Amount</h2>
            <h3 id="tot-amt-details">{data.amount}</h3>
            <h2 id="serv-desc">Service Description</h2>
            <p id="serv-desc-details">{data.description}</p>
        </div>
        )
    })
    
    }
    

</div>
</div>
    )}
export default MyService;