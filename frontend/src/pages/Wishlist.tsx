import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store/store";
import { Trash } from "lucide-react";
import { removeFavorite, removeAllFavorites } from "../store/slices/favoritesSlice";

export const Wishlist = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector((state: RootState) => state.favorites);
    const products = useSelector((state: RootState) => state.products);

    const wishlistProducts = products.filter((p) => items.includes(p._id));
    const wishlistCount = wishlistProducts.length;

    const handleRemoveFromWishlist = (productId: string) => {
        dispatch(removeFavorite(productId));
    };

    const handleNavigateToProduct = (productId: string) => {
        navigate(`/product/${productId}`);
    };

    const handleClearAll = () => {
        if (wishlistCount === 0) return;
        
        if (window.confirm(`Are you sure you want to remove all ${wishlistCount} items from your wishlist?`)) {
            dispatch(removeAllFavorites());
        }
    };

    return (
        <div className="max-w-7xl max-sm:px-2 mx-auto px-6 py-6">
            
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Wishlist ({wishlistCount})
                </h1>
                
                <button
                    onClick={handleClearAll}
                    disabled={wishlistCount === 0}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                    <Trash size={16} />
                    Clear All
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                
                {wishlistProducts.map((product) => (
                    <div 
                        key={product._id} 
                        className="bg-white rounded-lg shadow-sm border relative overflow-hidden cursor-pointer"
                        onClick={() => handleNavigateToProduct(product._id)}
                    >
                        
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFromWishlist(product._id);
                            }}
                            className="absolute top-3 right-3 bg-white/80 shadow-md w-8 h-8 rounded-full p-1 flex justify-center items-center cursor-pointer hover:bg-gray-200 transition-colors duration-200 z-10"
                            aria-label="Remove from wishlist"
                        >
                            <Trash size={16} className="text-gray-600" />
                        </button>
                        
                        <div className="w-full h-48 flex justify-center items-center p-4">
                            <img
                                src={product.img}
                                alt={product.name}
                                className="object-contain max-h-full max-w-full"
                            />
                        </div>

                        <div className="p-4 pt-2">
                            <h3 className="font-semibold text-md text-gray-800 truncate">{product.name}</h3>
                            <div className="flex items-baseline gap-2 mt-1 mb-2">
                                <p className="text-lg font-extrabold text-red-500">${product.price}</p>
                            </div>
                        </div>
                        
                    </div>
                ))}
            </div>

            {wishlistCount === 0 && (
                <p className="text-gray-500 text-center mt-10 text-lg border p-6 rounded-xl">
                    No items in your wishlist. Start adding some favorites!
                </p>
            )}
        </div>
    );
};

export default Wishlist;