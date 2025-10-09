
import { Data } from '../context/Data'
import { useEffect, useState } from 'react'
import ProductLayout from '../layout/ProductLayout'

const DataFetch = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        let Returned = true
        fetch("https://fakestoreapi.com/products/")
        .then(res => res.json())
        .then(data => { if (Returned) setProducts(Array.isArray(data) ? data : []) }) 
        .catch(() => { if (Returned) setProducts([]) })
        return () => { Returned = false }
    }, [])


    return (
        <>
            <Data.Provider value={products}>
                <ProductLayout/>
            </Data.Provider>
        </>
    )
}

export default DataFetch
