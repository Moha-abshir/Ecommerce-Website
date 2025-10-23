import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { HomePage } from './Pages/Home/HomePage';
import { CheckOutPage } from './Pages/checkOut/CheckOutPage';
import { OrdersPage } from './Pages/orders/OrdersPage'
import { TrackingPage } from './Pages/TrackingPage';
import { NotFoundPage } from './Pages/NotFoundPage'; 


function App() {
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        async function fetchData(){

        const res = await axios.get('/api/cart-items?expand=product')
        setCart(res.data)
        }
        fetchData();
    }, [])

      const [orders, setOrders] = useState([]);
      useEffect(()=>{
        async function fetchData(){
    
          const res = await axios.get('/api/orders?expand=products')
          setOrders(res.data);
        }
        fetchData();
      },[])

    return (
        <Routes>
            <Route  index element={<HomePage cart={cart}/>}/>
            <Route path='checkout' element={<CheckOutPage cart={cart}/>}/>
            <Route path='orders' element={<OrdersPage cart={cart} orders={orders}/>}/>
            <Route path='tracking/:orderId/:productId' element={<TrackingPage orders={orders}/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
    )
}

export default App