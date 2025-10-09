import { Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp";
import WhishList from "./pages/WhishList";
import ProductDetails from "./pages/ProductDetails";





function App() {
    return (
    <>
        <Navbar />
       
        
         <Routes>
            <Route path="/E-Commerce" element={<HomePage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/wishlist" element={<WhishList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
        
    
       
    </>
    );
}

export default App;
