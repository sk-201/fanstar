import React from "react";
import {ReactComponent as BackArrow} from '../../assets/backArrow.svg';
import Image from '../../assets/myimg.png';
import './my-images.css'
const MyImage=()=>(
<div className="my-image">
<BackArrow id="bck-arrw"/>
<span id="my-service-text">My Images</span>
<div className="my-img-cont">
   
     <img src={Image} id="myimg" /> 
   
    <h2 id="unlock-price-txt">Unlocking price</h2>
    <h3 id="unlock-price">Rs 599/-</h3>
    <p id="unlock-price-subtext">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hendrerit ut massa metus.Lorem ipLorem ipsum dolor sit amet, consectetur adipiscing elit. Hendrerit ut massa metus.Lorem ip </p>

</div>
</div>
)
export default MyImage;