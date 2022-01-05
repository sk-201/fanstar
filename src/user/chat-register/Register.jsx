import React,{Component} from 'react';
import Axios from 'axios';
import Ban from '../.././assets/register-banner.png';
import './Register.css';

class Register extends Component{
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
    <div className='Register'>
     <div className='img-banner'>
      <img src={Ban} alt="banner-img"/>     
     </div>
     <div>
         <h1>Product Type</h1>
         <h2 className='pers-text'>Personalised Services</h2>
         <h6 className='pers-text-h'> I will promote your brand on my <br/> instagram</h6>
         <h1>Final Amount:</h1>
         <h6>Rs2000/-</h6>
     </div>
     <form className='form-input' >
         <input type="text" placeholder='Enter name' />
         <input type="email" placeholder='Enter email'/>
         <input type="text" placeholder='Enter phone number'/>
         <input type="text" placeholder='@Instagram Handle'/>
         </form>
         <button className='btn-pay' onClick={this.razorPayPaymentHandler}>Pay Rs 2000/-</button>
     
     <text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hendrerit ut massa metus.Lorem ipLorem ipsum <span>Read more </span></text>
    </div>
    )}}

export default Register;