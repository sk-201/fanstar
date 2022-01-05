import React,{ Component } from 'react';
import Axios from 'axios';
import Ban from '../.././assets/register-banner.png';
import Back from '../.././assets/Rectangle 736.png';
import './subscriptions.css';
class Subscribe extends Component{
    constructor(props) {
        super(props)
      
        this.state = {
           
        }
       // this.razorPayHandler = this.razorPayHandler(this);
    
      }
      async razorPayPaymentHandler() {
        const API_URL = `/api/user/private/`
        const orderUrl = `${API_URL}order`;
        const response = await Axios.get(orderUrl);
        const { data } = response;
        console.log("App -> razorPayPaymentHandler -> data", data)
        console.log("response", response)
        
        const options = {
           key: 'rzp_test_o8yNNQSs02l7YA',//<--Razorpay key id-->
          name: "avdojo",
          description: "avodojo",
          order_id: data.id,
          handler: async (response) => {
            try {
             const paymentId = response.razorpay_payment_id;
             const url = `${API_URL}capture/${paymentId}`;
             const captureResponse = await Axios.post(url, {})
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
  render(){    
      
    return(
        <div className='subscription-main'>
            <img  className='back-img' src={Back} alt="background-img"/>
            <div className='subscription-container'>
                <h1 className="sub-head">Subscriptions</h1>
                <div className='subscription-main-2'>
                    <div className='img-container'>  <img  id="ban-img" src={Ban} alt="banner-img"/>  </div>
                
                <h1 id="sub-main-con">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hendre</h1>
                <input className='inp-sub'  type="text" placeholder= 'Name'/>
                <input className='inp-sub' type="email"placeholder='E-mail ID'/>
                <input  className='inp-sub' type="tel" placeholder='Phone-no'/>
             <button className='btn-sub' onClick={this.razorPayPaymentHandler }>Pay Rs 500/-</button>
                </div>

            </div>

        </div>
    )}
}
export default Subscribe;