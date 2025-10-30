import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "../Shared-Components/header";
import dayjs from "dayjs";
import "./TrackingPage.css";

export function TrackingPage({orders}) {
  useEffect(()=>{
    document.title = `Track - ${orderedProduct.product.name}`
  });

  const {orderId, productId}= useParams();
  const order = orders.find(o => o.id === orderId);
  const orderedProduct = order ? order.products.find(p => p.productId === productId): null;
  if(!order || !orderedProduct){
    return <div>Loading the Product</div>
  }
  
  const totalDeliveryTimeMs = orderedProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf()-order.orderTimeMs;

  let deliveryPercent = (timePassedMs/totalDeliveryTimeMs)*100;

  if(deliveryPercent > 100){
    deliveryPercent =100;
  }
  return (
    <>

      <Header/>

      <div className="tracking-page">

        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryPercent >= 100? "Delivered On: " : "Arriving On: "}
            {dayjs(orderedProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {orderedProduct.product.name}
          </div>

          <div className="product-info">Quantity: {orderedProduct.quantity}</div>

          <img
            className="product-image"
            src={orderedProduct.product.image}
          />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${deliveryPercent}%`}}></div>
          </div>
        </div>
      </div>
    </>
  );
}
