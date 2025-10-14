import { Routes, Route } from 'react-router';
import { HomePage } from './Pages/HomePage'
import { CheckOutPage } from './Pages/CheckOutPage';
import { OrdersPage } from './Pages/OrdersPage';
import { TrackingPage } from './Pages/TrackingPage';

import './App.css';

function App() {

    return (
        <Routes>
            <Route  index element={<HomePage/>}/>
            <Route path='checkout' element={<CheckOutPage/>}/>
            <Route path='orders' element={<OrdersPage/>}/>
            <Route path='tracking' element={<TrackingPage/>}/>
        </Routes>
    )
}

export default App