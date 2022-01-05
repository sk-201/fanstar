import React from 'react';
import Banner from '../../assets/register-banner.png';
import {Link} from 'react-router-dom';
import {ReactComponent as Cross} from '../../assets/cross.svg';
import {ReactComponent as Blue} from '../../assets/blue.svg';
import {ReactComponent as Green} from '../../assets/green.svg';
import {ReactComponent as Red} from '../../assets/red.svg';
import {ReactComponent as Yellow} from '../../assets/yellow.svg';
import './edit.css';
const Edit=()=>(   
<div className='edit-profile'>
    <Cross id="cross-icon"/>  
    <span id="edit-txt">Edit profile</span>
  
    <div className='edit-container'>
    <img id="img-edit" src={Banner}/>
 <Link id="chng-pp" to='#'><span>Change profile picture</span></Link>      
 <input type="text" className="inp-edit" placeholder='Name'/>
    <input type="text" className="inp-edit" placeholder='Bio'/>
    <h4 id="select-theme">Select theme for app</h4>
    <h6 id="select-theme-subhead">Select any one</h6>
    <div className='theme-icons'>
    <Blue/>
    <Green/>
    <Red/>
    <Yellow/>
    </div>
    <button id="btn-update">Update</button>

    </div>
</div>
)
export default Edit;