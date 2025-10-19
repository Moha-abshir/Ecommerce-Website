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
        axios.get('/api/cart-items?expand=product')
        .then(res=> setCart(res.data))

    }, [])

    return (
        <Routes>
            <Route  index element={<HomePage cart={cart}/>}/>
            <Route path='checkout' element={<CheckOutPage cart={cart}/>}/>
            <Route path='orders' element={<OrdersPage cart={cart}/>}/>
            <Route path='tracking' element={<TrackingPage/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
    )
}

export default App