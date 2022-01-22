import React ,{useState,useEffect} from 'react';
import {ReactComponent as BackArrow} from '../../assets/backArrow.svg';
import API from '../../api';
import { useParams,useNavigate } from 'react-router-dom';
import '../add-service/add-service.css';
const EditService=()=>{
  const navigate=useNavigate();
  const {id}=useParams();
  const [serviceName,setserviceName]=useState("");
  const [amount,setAmount]=useState("");
  const [description,setDescription]=useState("");
  useEffect(()=>{
    const config={
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${localStorage.getItem("fanstarToken")}`
      }
  
    }
   API.get(`/api/artist/private/getservice/${id}`,config).then(({data})=>{
     setserviceName(data.serviceName);
     setAmount(data.amount);
     setDescription(data.description);
   })
  },[])
  const createService =async(e)=>{
    e.preventDefault();
    try{
      if(serviceName.trim()!==""&& amount.trim()!==""&&description.trim()!==""){
        const config={
            headers:{
              "Content-Type":"application/json",
              Authorization:`Bearer ${localStorage.getItem("fanstarToken")}`
            }
        
          }
          await API.put(`/api/artist/private/updateservice/${id}`,{serviceName,amount,description},config);
          alert("Service Updated");
          navigate("/service");
          
       }

      }
    catch(error){
      console.log(error);
    }
  }
    return(
    <div className='add-service'>
        <BackArrow id="bck-arrow"/>
        <span id="add-service-text">Edit Service</span>
        <div className='add-service-form'>
        <form onSubmit={createService}>
        <label for="serv-name"> Service Name</label>
         <input id="serv-name" type="text" className='inp-add' value={serviceName} placeholder='typing...' onChange={(e)=>setserviceName(e.target.value)} />
         <label for="total-amt"> Total Amount</label>
         <input id="total-amt" type="text"className='inp-add'placeholder='Rs' value={amount} onChange={(e)=>setAmount(e.target.value)} />
         <label for="serv-desc"> Service Description</label>
         <input id="serv-desc" type="text"className='inp-add'placeholder='typing...' value={description} onChange={(e)=>setDescription(e.target.value)}/>
         <button id="btn-add-service" type="submit">Update Service</button>
         
        </form>
        </div>
    </div>
    )}
export default EditService;