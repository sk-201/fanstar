import React, { Component } from 'react'
import API from '../../api';
export class Payment extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
   // this.razorPayHandler = this.razorPayHandler(this);

  }

  async razorPayPaymentHandler() {
    const API_URL = `/api/user/private/`
    const orderUrl = `${API_URL}order`;
    const response = await API.get(orderUrl);
    const { data } = response;
    console.log("App -> razorPayPaymentHandler -> data", data)
    console.log("response", response)
    
    const options = {
       key: '<--Razorpay key id-->',
      name: "avdojo",
      description: "avodojo",
      order_id: data.id,
      handler: async (response) => {
        try {
         const paymentId = response.razorpay_payment_id;
         const url = `${API_URL}capture/${paymentId}`;
         const captureResponse = await API.post(url, {})
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
  
  render() {
    return (
      <div>
        <button 
        onClick={this.razorPayPaymentHandler}
        className="btn btn-primary">
          Pay Now
        </button>
      </div>
    )
  }
}

export default Payment;