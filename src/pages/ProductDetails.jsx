import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/slices/cartSlice";
import { Data } from "../context/Data";

function ProductDetails() {
    const { id } = useParams();
    const products = useContext(Data);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // ✅ لازم هنا فوق
    const dispatch = useDispatch();

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

    const handleAddToCart = (e) => {
        if (quantity <= 0 || !product) return;
        dispatch(addProduct({ product, quantity }));
        setQuantity(1);
        e.preventDefault();
        alert(`${product.title} has been added to your cart Successfully ✅`);
    };

    return (
        <div className="p-6 flex flex-col items-center text-center">
            <img
                src={product.image}
                alt={product.title}
                className="w-[250px] h-[250px] object-contain"
            />
            <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
            <p className="text-red-500 text-lg mt-2 ">{product.price}$</p>
            <p className="mt-4 max-w-[600px]">{product.description}</p>
        
        
            <div>
                <div className="mt-6 flex items-center gap-3">
                    <button
                        aria-label="Decrease quantity"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        -
                    </button>

                    <div className="px-4 py-1 border rounded text-lg font-medium">
                        {quantity}
                    </div>

                    <button
                        aria-label="Increase quantity"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        +
                    </button>
                </div>

                <button
                    className={`bg-red-500 text-white px-4 py-2 rounded-lg mt-8 ${
                        quantity === 0
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                    }`}
                    disabled={quantity === 0}
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            </div>

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
