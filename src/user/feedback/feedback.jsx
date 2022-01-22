import React,{useState} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import {ReactComponent as Star} from '../.././assets/Star.svg';
import {ReactComponent as StarE} from '../.././assets/Star 6.svg';
import {ReactComponent as BackArrow} from '../../assets/backArrow.svg';
import API from '../../api';
import './feedback.css';
const Feedback=()=>{
    const {artistId} =useParams();
    const [stars,setStars]=useState(1);
    const [star1,setStar1]=useState("");
    const [star2,setStar2]=useState("");
    const [star3,setStar3]=useState("");
    const [star4,setStar4]=useState("");
    const [star5,setStar5]=useState("");
    const [message,setMessage]=useState("");
    const navigate=useNavigate();
    const AddFeedback=async()=>{
         
        try{
        
            const config={
              headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${localStorage.getItem("fanstarToken")}`
              }
            }
           
           await API.post('/api/user/private/givefeedback',{artistId,stars,message},config);
            alert("Thanks for the feedback")
             navigate(`/artist/${artistId}`);
          }
        
        catch(error){
          alert("Something went wrong");
          console.log(error);
        }
    
    
        }
    return(
<div className='feedback'>
<BackArrow id="back-arrow"/>
<h1 className='rate-head'>Rate your Experience</h1>
<span className='rate-head-span'>Are you satisfied with the service</span>
<div className='stars-tab'>
 {star1?<Star className='star' onClick={()=>{setStar1("filled");setStars(1);}}/>
 :<StarE className='star' onClick={()=>{setStar1("filled");setStars(1)}}/>
}   
{star2?<Star className='star' onClick={()=>{setStar2("filled");setStar1("filled");setStars(2)}}/>
 :<StarE className='star' onClick={()=>{setStar2("filled");setStar1("filled");setStars(2)}}/>
}  
{star3?<Star className='star' onClick={()=>{setStar3("filled");setStar2("filled");setStar1("filled");setStars(3)}}/>
 :<StarE className='star' onClick={()=>{setStar3("filled");setStar2("filled");setStar1("filled");setStars(3)}}/>
}  
{star4?<Star className='star' onClick={()=>{setStar4("filled");setStar3("filled");setStar2("filled");setStar1("filled");setStars(4)}}/>
 :<StarE className='star' onClick={()=>{setStar4("filled");setStar3("filled");setStar2("filled");setStar1("filled");setStars(4)}}/>
}  
{star5?<Star className='star' onClick={()=>{setStar5("filled");setStar4("filled");setStar3("filled");setStar2("filled");setStar1("filled");setStars(5)}}/>
 :<StarE className='star' onClick={()=>{setStar5("filled");setStar4("filled");setStar3("filled");setStar2("filled");setStar1("filled");setStars(5)}}/>
}  

</div>
<h4 className='h4-head'>Tell us How was your experience</h4>
<textarea cols="38" rows="10" placeholder='Tell us How was your experience' value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
<button onClick={AddFeedback}>Submit</button>
</div>
    )}
export default Feedback;