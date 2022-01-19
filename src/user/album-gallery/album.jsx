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
      console.log(data);
      const arr=[];
      for(let i=0;i<data.length;i++){
        axios.get(`/api/user/private/readimage/${data[i].fileUrl}`,config).then((res)=>{
        console.log(res.data);
        arr.push(res.data);
        // setPhotos([...photos,res.data])
          console.log("response");
        })
        setPhotos(arr);
      }

        // setPhotos([...photos,res.data])
        
    
    }
    ) 

      },[])
    return(
        <div className="album">
             <div className='album-card'>
        {album.length>0 && album.map((data,ind)=>{
          return(
            
            <div>
            <div className='album-card-1' key={ind}><img className="album-card-img" src={`data:image/png;base64, ${photos.length>0 && photos[ind]}`}  onClick={()=>{
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