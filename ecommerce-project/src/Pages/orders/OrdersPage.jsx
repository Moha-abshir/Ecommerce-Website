import { useEffect, useState} from 'react';
import { Header } from "../../Shared-Components/header";
import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import './OrdersPage.css';
import axios from 'axios';
import { OrderProducts } from './OrderProducts';

export function OrdersPage({cart, loadCart}) {
  const [orders, setOrders] = useState([]);
  useEffect(()=>{
    axios.get('/api/orders?expand=products')
    .then(res => setOrders(res.data));
  })

  return (
    <>
    <title>Orders</title>

	  <Header cart={cart}/>
      <div className="orders-page" key={orders.orderId}>
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">

          {orders.map((order)=>{
            return(
              <div className="order-container" key={order.id}>
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{formatMoney(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">

                  {order.products.map((orderProducts)=>{

                    return(
                      <OrderProducts orderProducts={orderProducts} order={order} key={orderProducts.productId} loadCart={loadCart}/>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
}
