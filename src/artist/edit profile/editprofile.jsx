import React ,{useState} from 'react';
import Banner from '../../assets/register-banner.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {ReactComponent as Cross} from '../../assets/cross.svg';
import {ReactComponent as Blue} from '../../assets/blue.svg';
import {ReactComponent as Green} from '../../assets/green.svg';
import {ReactComponent as Red} from '../../assets/red.svg';
import {ReactComponent as Yellow} from '../../assets/yellow.svg';
import './edit.css';
const Edit=()=>{
    const navigate=useNavigate();
    const [baseImage, setBaseImage] = useState(Banner);
    const [Name,setName]=useState("");
    const [Bio,setBio] =useState("");

    const uploadImage = async (e) => {
      const file = e.target.files[0];
      const base64 = await convertBase64(file);
      setBaseImage(base64);
    };
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };
      const updateData =async()=>{
        try{
          if(Name.trim()!==""&& Bio.trim()!==""){
            const config={
                headers:{
                  "Content-Type":"application/json",
                  Authorization:`Bearer ${localStorage.getItem("fanstarToken")}`
                }
            
              }
              await axios.put("/api/artist/private/updateprofile",{username:Name,profilePhoto:baseImage,bio:Bio},config)
              alert("Profile Updated");
              navigate("/artist/landing");
           }
    
          }
        catch(error){
          console.log(error);
        }
      }
    return(
<div className='edit-profile'>
    <Cross id="cross-icon"/>  
    <span id="edit-txt">Edit profile</span>
  
    <div className='edit-container'>
    <img id="img-edit" src={baseImage}/>
 <label htmlFor="chng-pp" id="chng-pp-1">Change profile picture</label>
 <input id="chng-pp" type="file"   onChange={(e) => {
            uploadImage(e);
          }} style={{display:"none"}} />    
      
 <input type="text" className="inp-edit" placeholder='Name' value={Name} onChange={(e)=>setName(e.target.value)} />
    <input type="text" className="inp-edit" placeholder='Bio'value={Bio} onChange={(e)=>setBio(e.target.value)}  />
    <h4 id="select-theme">Select theme for app</h4>
    <h6 id="select-theme-subhead">Select any one</h6>
    <div className='theme-icons'>
    <Blue/>
    <Green/>
    <Red/>
    <Yellow/>
    </div>
    <button id="btn-update" onClick={updateData}>Update</button>

    </div>
</div>
    )
}
export default Edit;