import React from 'react';
import {ReactComponent as Star} from '../.././assets/Star.svg';
import {ReactComponent as StarE} from '../.././assets/Star 6.svg';
import './feedback.css';
const Feedback=()=>(
<div className='feedback'>
<h1 className='rate-head'>Rate your Experience</h1>
<span className='rate-head-span'>Are you satisfied with the service</span>
<div className='stars-tab'>
<Star className='star'/>
<Star className='star' />
<Star className='star'/>
<Star className='star'/>
<StarE className='star'/>
</div>
<h4 className='h4-head'>Tell us How was your experience</h4>
<textarea cols="38" rows="10" placeholder='Tell us How was your experience'></textarea>
<button>Submit</button>
</div>
)
export default Feedback;