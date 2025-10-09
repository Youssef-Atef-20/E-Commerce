import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Data } from "../context/Data";

function ProductDetails() {
    const { id } = useParams();
    const products = useContext(Data);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const found = products.find((p) => p.id === Number(id));
        if (found) {
        setProduct(found);
        } else {

        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data))
            .catch(() => setProduct(null));
        }
    }, [id, products]);

    if (!product)
        return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Loading product...</h1>
        </div>
        );

    return (
        <div className="p-6 flex flex-col items-center text-center">
        <img
            src={product.image}
            alt={product.title}
            className="w-[250px] h-[250px] object-contain"
        />
        <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
        <p className="text-red-500 text-lg mt-2">${product.price}</p>
        <p className="mt-4 max-w-[600px]">{product.description}</p>

        <Link
            to="/"
            className="inline-block mt-6 text-blue-600 hover:underline text-lg"
        >
            ⬅️ Back to Home
        </Link>
        </div>
    );
}

export default ProductDetails;
