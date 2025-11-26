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
    const isAdmin = auth.user?.isAdmin;

    const product = useSelector((state: RootState) =>
        state.products.find(p => p._id === id)
    );

    const favorites = useSelector((state: RootState) => state.favorites);

    const [quantity, setQuantity] = useState(1);
    const [favorited, setFavorited] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    
    const availableColors: string[] = product?.colors || ['Black', 'White', 'Navy', 'Forest Green', 'Burgundy', 'Rose Pink'];
    const availableSizes: string[] = product?.sizes || ['XS', 'S', 'M', 'L', 'XL'];
    
    const [selectedColor, setSelectedColor] = useState(availableColors[0] || '');
    const [selectedSize, setSelectedSize] = useState(availableSizes[0] || '');

    useEffect(() => {
        if (product) {
            setFavorited(favorites.includes(product._id));
            if (product.colors && product.colors.length > 0) {
                setSelectedColor(product.colors[0]);
            } else {
                setSelectedColor(availableColors[0]);
            }
            if (product.sizes && product.sizes.length > 0) {
                setSelectedSize(product.sizes[0]);
            } else {
                setSelectedSize(availableSizes[0]);
            }
        }
    }, [product, favorites]);

    if (!product)
        return <div className="p-10 text-center text-lg">Product not found</div>;

    const handleAdd = () => {
        if (!auth.user) return navigate("/register");
        if (quantity > 0) {
            dispatch(addProduct({ productId: product._id, quantity, color: selectedColor, size: selectedSize }));
            alert(`${quantity} ${product.name} (${selectedColor}, ${selectedSize}) added to cart`);
        }
    };

    const toggleFavorite = () => {
        if (!product) return;
        if (favorited)
            dispatch(removeFavorite(product._id));
        else
            dispatch(addFavorite(product._id));
        setFavorited(!favorited);
    };

    const getColorCheckMark = (colorOption: string) => {
        if (selectedColor !== colorOption) return null;

        const checkColor = (colorOption === 'White' || colorOption === 'Rose Pink') ? 'text-black' : 'text-white';
        
        return (
            <span 
                className={`text-xs font-bold -mt-0.5 ${checkColor}`} 
                style={{textShadow: (colorOption === 'White' || colorOption === 'Rose Pink') ? '0 0 2px white' : 'none'}}
            >
                ✓
            </span>
        );
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
                    
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-800">Colors:</span>
                        {availableColors.map((colorOption: string) => (
                            <button
                                key={colorOption}
                                onClick={() => setSelectedColor(colorOption)}
                                className={`w-8 h-8 rounded-full border-2 transition-all duration-200 flex justify-center items-center
                                    ${selectedColor === colorOption ? 'border-red-500 ring-2 ring-red-300' : 'border-gray-300 hover:border-gray-400'}`}
                                
                                style={{ 
                                    backgroundColor: 
                                        colorOption === 'Black' ? '#000000' :
                                        colorOption === 'White' ? '#FFFFFF' :
                                        colorOption === 'Navy' ? '#000080' :
                                        colorOption === 'Forest Green' ? '#228B22' :
                                        colorOption === 'Burgundy' ? '#800020' :
                                        colorOption === 'Rose Pink' ? '#FFC0CB' :
                                        '#CCCCCC' 
                                }}
                                aria-label={`Select color ${colorOption}`}
                            >
                                {getColorCheckMark(colorOption)}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                        <span className="font-semibold text-gray-800">Size:</span>
                        {availableSizes.map((sizeOption: string) => (
                            <button
                                key={sizeOption}
                                onClick={() => setSelectedSize(sizeOption)}
                                className={`px-4 py-2 border rounded-md font-medium text-sm transition-colors duration-200
                                    ${selectedSize === sizeOption ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'}`}
                                aria-label={`Select size ${sizeOption}`}
                            >
                                {sizeOption}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                        
                        <div className="flex border border-gray-400 rounded-md overflow-hidden">
                            <button
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="w-10 h-10 bg-white hover:bg-gray-100 flex justify-center items-center border-r"
                                disabled={quantity <= 1}
                            >
                                <Minus size={18} />
                            </button>
                            <span className="w-12 h-10 text-lg font-medium flex justify-center items-center text-gray-900">
                                {quantity}
                            </span>
                            <button
                                onClick={() => setQuantity(q => Math.min(q + 1, product.stock))}
                                className="w-10 h-10 bg-white hover:bg-gray-100 flex justify-center items-center border-l"
                                disabled={quantity >= product.stock || product.stock === 0}
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                        
                        <button
                            onClick={handleAdd}
                            disabled={product.stock === 0 || quantity === 0}
                            className={`flex-1 py-3 px-8 rounded-md font-medium text-white transition-colors duration-200 
                                ${product.stock === 0 || quantity === 0 ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"}`}
                        >
                            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                        </button>

                        <button
                            onClick={toggleFavorite}
                            className={`w-12 h-12 rounded-full border border-gray-400 flex justify-center items-center transition-colors duration-200 
                                ${favorited ? "bg-red-500 text-white border-red-500" : "bg-white text-gray-500 hover:bg-gray-100"}`}
                        >
                            <Heart size={20} className={favorited ? "fill-current" : "stroke-current"} />
                        </button>
                    </div>
                    
                    {isAdmin && (
                        <button
                            onClick={() => setEditOpen(true)}
                            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors duration-200"
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