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
            <Route path="/" element={<HomePage />} />
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
// Ecommerce/
// ├── public/                     # Contains static files like index.html and images
// ├── src/                        # Main source folder for all app logic and UI
// │   ├── assets/                 # Images, icons, and other static resources
// │   ├── context/                # Context or data files shared across components
// │   ├── layout/                 # Reusable UI components like Navbar, Footer, Product layout
// │   ├── pages/                  # Page-level components (Home, Cart, Login, etc.)
// │   ├── store/                  # Redux store setup and slices for state management
// │   ├── App.css / App.jsx       # Main app styling and root component
// │   ├── index.css               # Global styles
// │   └── main.jsx                # Entry point of the React application
// ├── eslint.config.js            # Linting configuration
// └── index.html                  # Main HTML template

