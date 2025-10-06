import './App.css'

import Navbar from './components/navbar'
import ProductLayout from './components/ProductLayout'
import Footer from './layout/footer'

function App() {

    const products = [
        { id: 1, name: "Wireless Mouse", price: 25, oldPrice: 40 },
        { id: 2, name: "Mechanical Keyboard", price: 75, oldPrice: 99 },
        { id: 3, name: " Headphones", price: 120, oldPrice: 150 },
        { id: 4, name: "Gaming Chair", price: 220, oldPrice: 300 },
        { id: 5, name: "4K Monitor", price: 350, oldPrice: 500 },
        { id: 6, name: "Wireless Mouse", price: 25, oldPrice: 40 },
        { id: 7, name: "Mechanical Keyboard", price: 75, oldPrice: 99 },
        { id: 8, name: " Headphones", price: 120, oldPrice: 150 },
        { id: 9, name: "Gaming Chair", price: 220, oldPrice: 300 },
        { id: 10, name: "4K Monitor", price: 350, oldPrice: 500 },
        { id: 11, name: "4K Monitor", price: 350, oldPrice: 500 },
    ];

    return (
        <>
            <ProductLayout products={products} limitPerPage={9}/>
            <Navbar />
        </>
    )
}

export default App
