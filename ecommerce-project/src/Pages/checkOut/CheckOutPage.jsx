import axios from "axios";
import { useState, useEffect } from "react";
import { OrderSummery } from "./OrderSummery";
import { PaymentSummery } from "./PaymentSummery";
import { CheckOutHeader } from "./CheckOutHeader";
import "./checkout-header.css";
import "./CheckOutPage.css";

export function CheckOutPage({cart}) {
  const [deliveryOptions, setDeliveryOptions]= useState([]);
  const [paymentSummery, setPaymentSummery] = useState(null)

  useEffect(()=>{
    axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
    .then(res => setDeliveryOptions(res.data));

    axios.get('/api/payment-summary')
    .then((res)=>{setPaymentSummery(res.data)})
  } ,[]);
  return (
    <>
      <title>Checkout</title>
      <CheckOutHeader/>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummery deliveryOptions={deliveryOptions} cart={cart}/>
          <PaymentSummery paymentSummery={paymentSummery}/>
        </div>
      </div>
    </>
  );
}
