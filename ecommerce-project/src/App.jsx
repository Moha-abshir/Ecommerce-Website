import { Routes, Route } from 'react-router';
import { HomePage } from './Pages/HomePage'
import { CheckOutPage } from './Pages/CheckOutPage';
import './App.css';

function App() {

    return (
        <Routes>
            <Route  index element={<HomePage/>}/>
            <Route path='checkout' element={<CheckOutPage/>}/>
        </Routes>
    )
}

export default App