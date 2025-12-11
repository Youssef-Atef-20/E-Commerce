import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, Heart } from "lucide-react";
import type { RootState } from "../store/store";
import { addProduct } from "../store/slices/cartSlice";
import ProductModal from "../components/ProductModal";
import { addFavorite, removeFavorite } from "../store/slices/favoritesSlice";

const ProductPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth);
    const isAdmin = auth.user?.isAdminstartor;

    const product = useSelector((state: RootState) =>
        state.products.find(p => p._id === id)
    );

    const favorites = useSelector((state: RootState) => state.favorites);

    const [quantity, setQuantity] = useState(1);
    const [favorited, setFavorited] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    

    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (product) {
            setFavorited(favorites.includes(product._id));
        }
    }, [product, favorites]);

    if (!product)
        return <div className="p-10 text-center text-lg">Product not found</div>;

    const handleAdd = () => {
        if (quantity > 0) {
            dispatch(addProduct({ productId: product._id, quantity }));
            setAdded(true);
            setTimeout(() => setAdded(false), 1000);
        }
    };

    const toggleFavorite = () => {
        if (!auth.user) return navigate("/register");
        if (!product) return;
        if (favorited)
            dispatch(removeFavorite(product._id));
        else
            dispatch(addFavorite(product._id));
        setFavorited(!favorited);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8 bg-white p-8 rounded-xl shadow-md">

                <div className="flex w-full md:w-1/2 justify-center items-center rounded-xl p-6 h-[450px]">
                    <img
                        src={product.img}
                        alt={product.name}
                        className="object-contain max-h-full max-w-full rounded-lg"
                    />
                </div>

                <div className="w-full md:w-1/2 flex flex-col gap-4">

                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

                    <div className="flex flex-col gap-1 border-b pb-4">
                        <p className="text-4xl font-extrabold text-red-500">${product.price}.00</p>
                        <p className="text-lg font-medium text-gray-700">
                            {product.stock > 0 ? (
                                <span className="text-green-600">In Stock: {product.stock} items</span>
                            ) : (
                                <span className="text-red-600">Out of Stock</span>
                            )}
                        </p>
                    </div>

                    <p className="text-gray-700 text-base border-b pb-4">{product.description}</p>

                    <div className="flex flex-col md:flex-row gap-4 mt-auto">

                        <div className="flex flex-col gap-2 w-full md:w-auto">
                            <div className="flex border border-gray-300 rounded-xl overflow-hidden w-full sm:w-auto justify-between">

                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 flex justify-center items-center cursor-pointer"
                                    disabled={quantity <= 1}
                                >
                                    <Minus size={18} />
                                </button>

                                <input
                                    value={quantity}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9]/g, "");
                                        if (value === "") return setQuantity(1);
                                        const num = Math.max(1, Math.min(Number(value), product.stock));
                                        setQuantity(num);
                                    }}
                                    className="w-16 h-10 text-center text-lg font-semibold outline-none"
                                />

                                <button
                                    onClick={() => setQuantity(q => Math.min(q + 1, product.stock))}
                                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 flex justify-center items-center cursor-pointer"
                                    disabled={quantity >= product.stock}
                                >
                                    <Plus size={18} />
                                </button>

                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row w-full gap-3">

                            <button
                                onClick={handleAdd}
                                disabled={product.stock === 0}
                                className={`flex-1 py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 cursor-pointer
                                    ${product.stock === 0
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : added
                                            ? "bg-green-500"
                                            : "bg-red-500 hover:bg-red-600"
                                    }`}
                            >
                                {added ? "Added!" : product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                            </button>

                            <button
                                onClick={toggleFavorite}
                                className={`w-full sm:w-12 h-12 sm:h-12 rounded-xl border flex justify-center items-center transition cursor-pointer
                                    ${favorited ? "bg-red-500 text-white border-red-500" : "bg-white text-gray-600 hover:bg-gray-100"}`}
                            >
                                <Heart size={20} className={favorited ? "fill-current" : "stroke-current"} />
                            </button>

                        </div>
                    </div>

                    {isAdmin && (
                        <button
                            onClick={() => setEditOpen(true)}
                            className="cursor-pointer flex items-center justify-center gap-2 bg-black text-white py-3 px-5 rounded-2xl font-semibold shadow-sm transition-all"
                        >
                            Edit Product
                        </button>
                    )}
                </div>
            </div>

            <ProductModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                mode="edit"
                product={product}
            />
        </div>
    );
};

export default ProductPage;
