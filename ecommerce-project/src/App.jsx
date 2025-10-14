import { Routes, Route } from 'react-router';
import { HomePage } from './Pages/HomePage'
import './App.css';

function App() {

    return (
        <Routes>
            <Route  index element={<HomePage/>}/>
            <Route path='checkout' element={<div>Test CheckOut Page</div>}/>
        </Routes>
    )
}

export default App