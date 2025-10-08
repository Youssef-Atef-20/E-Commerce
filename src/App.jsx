import './App.css'
import Navbar from './layout/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';

function App() {

    return (
        <BrowserRouter>
            {/* <Navbar /> */}
            <Routes>
                <Route path="/" element={<Homepage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
