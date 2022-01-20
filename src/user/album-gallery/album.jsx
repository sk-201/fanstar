import React,{useEffect,useState} from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import '../landing/landing.css';
const Album=()=>{
    const navigate=useNavigate();
    const [album,setAlbum]=useState([]);
    const[photos,setPhotos]=useState([]);
    const {id}=useParams();
    useEffect(()=>{
        const config={
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${localStorage.getItem("fanstarToken")}`
          }
      
        }
    axios.get(`/api/user/public/getalbums/${id}`,config ).then(({data})=>{
      setAlbum(data);
      const arr=[];
      for(let i=0;i<data.length;i++){
        axios.get(`/api/user/private/readimage/${data[i].fileUrl}`,config).then((res)=>{
       console.log(res.data);
       console.log("res");
        arr.push(res.data);
        
        // setPhotos([...photos,res.data])
        
        })
      

      }
      console.log(arr);
      setPhotos(arr);

        // setPhotos([...photos,res.data])
        
    
    }
    ) 

      },[])
    return(
        <div className="album">
             <div className='album-card'>
        {album.length>0 && album.map((data,ind)=>{
          return(
            
            <div key={ind}>
            <div className='album-card-1' ><img className="album-card-img" src={`https://fanstar.s3.us-east-2.amazonaws.com/${data.fileUrl}`}  onClick={()=>{
                navigate(`/artist/${id}/user/album/${data._id}`)
             }}/></div>
          </div>
           
          )
        }
        )}
           </div>  

        </div>
    )
        
    
}
export default Album;