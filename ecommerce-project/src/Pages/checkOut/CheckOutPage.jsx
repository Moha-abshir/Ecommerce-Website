import axios from "axios";
import { useState, useEffect } from "react";
import { OrderSummery } from "./OrderSummery";
import { PaymentSummery } from "./PaymentSummery";
import { CheckOutHeader } from "./CheckOutHeader";
import "./checkout-header.css";
import "./CheckOutPage.css";

export function CheckOutPage({cart, loadCart}) {
  const [deliveryOptions, setDeliveryOptions]= useState([]);
  const [paymentSummery, setPaymentSummery] = useState(null)

  useEffect(()=>{
    async function fetchData(){
      try{
        const res = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
        setDeliveryOptions(res.data);

        const res2 = await axios.get('/api/payment-summary')
        setPaymentSummery(res2.data)
      }
      catch(error){
        console.error("Error fetching data: ", error)
      }
      
    }
    fetchData();
  } ,[cart]);
  return (
    <>
      <title>Checkout</title>
      <CheckOutHeader/>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummery deliveryOptions={deliveryOptions} cart={cart} loadCart={loadCart}/>
          <PaymentSummery paymentSummery={paymentSummery}/>
        </div>
      </div>
    </>
  );
}
