import { useState } from "react";
import { CartProduct } from "../components/CartProduct";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import {
    clearCart,
    decQuantity,
    incQuantity,
    removeProduct,
    setCart
} from "../store/slices/cartSlice";
import api from "../Api";

export const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart);
    const products = useSelector((state: RootState) => state.products);
    const auth = useSelector((state: RootState) => state.auth);

    const [loading, setLoading] = useState(false);
    const [points, setPoints] = useState(0);

    const cleanCart = cart.filter(item =>
        products.find(p => p._id === item.productId && item.quantity <= p.stock)
    );

    if (cleanCart.length !== cart.length) {
        dispatch(setCart({ cart: cleanCart }));
    }

    const items = cleanCart.map(item => ({
        quantity: item.quantity,
        product: products.find(p => p._id === item.productId)!
    }));

    const increase = (id: string) => dispatch(incQuantity({ productId: id }));
    const decrease = (id: string) => dispatch(decQuantity({ productId: id }));
    const removeItem = (id: string) => dispatch(removeProduct({ productId: id }));

    const total = items.reduce(
        (acc, i) => acc + i.product.price * i.quantity,
        0
    );
    const discount = points * 0.1;
    const maxPoints = Math.min(auth.user?.loyaltyPoints || 0, total * 10);
    const finalTotal = Math.max(0, total - discount);

    const handleCheckout = () => {
        if (loading) return;
        setLoading(true);

        api.post("/products/checkout", {
            cart: cleanCart,
            points
        })
            .then(x => {
                dispatch(clearCart());
                location.href = x.data.url;
            })
            .catch(e => {
                setLoading(false);

                if (e?.response?.data?.ok) {
                    dispatch(setCart(e.response.data.ok));

                    for (const x of e.response.data.errors) {
                        alert(
                            "Error with product of ID : " +
                            x.productId +
                            " - " +
                            x.message
                        );
                    }
                } else {
                    alert(e?.response?.data?.message);
                }
            });
    };

    const handleRemoveAll = () => {
        if (items.length === 0) return;

        if (window.confirm("Are you sure you want to clear your entire cart?")) {
            dispatch(clearCart());
        }
    };

    return (
        <div className="max-w-7xl max-sm:px-2 mx-auto px-6 py-6 flex flex-col h-full">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            {items.length === 0 ? (
                <p className="text-gray-500 text-center mt-6 text-lg">
                    Your cart is empty.
                </p>
            ) : (
                <div className="flex flex-col gap-4 flex-1">
                    <div className="hidden md:grid grid-cols-5 text-gray-500 font-semibold border-b pb-4 items-center">
                        <span className="col-span-2">Product</span>
                        <span className="flex justify-start">Price</span>
                        <span className="flex justify-center">Quantity</span>
                        <span className="flex justify-start">Subtotal</span>
                    </div>

                    <div className="flex flex-col gap-4">
                        {items.map(({ product, quantity }) => (
                            <CartProduct
                                key={product._id}
                                product={product}
                                quantity={quantity}
                                onIncrease={increase}
                                onDecrease={decrease}
                                onRemove={removeItem}
                            />
                        ))}
                    </div>

                    <div className="flex justify-between items-center mt-8">
                        <button
                            onClick={() => (window.location.href = "/")}
                            className="border border-gray-300 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
                        >
                            Return To Shop
                        </button>
                        <button
                            onClick={handleRemoveAll}
                            className="border border-red-600 px-8 py-3 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
                        >
                            Remove All
                        </button>
                    </div>

                    <div className="mt-8 p-8 border rounded-lg shadow-xl w-full bg-white">
                        <div className="mb-6">
                            <label className="block mb-3 font-semibold text-lg text-gray-800">
                                🎁 Use Loyalty Points
                            </label>

                            <input
                                type="number"
                                min={0}
                                max={maxPoints}
                                value={points}
                                onChange={e => {
                                    const v = Number(e.target.value);
                                    if (v <= maxPoints) setPoints(v);
                                    if (v < 0) setPoints(0);
                                }}
                                className="border border-gray-300 px-3 py-4 rounded-lg w-full text-lg focus:border-black focus:ring-0 outline-none transition duration-150"
                            />

                            <p className="text-sm text-gray-600 mt-1">
                                Available: {auth.user?.loyaltyPoints || 0} pts ·
                                Max usable: {maxPoints}
                            </p>

                            {points > 0 && (
                                <p className="text-green-600 mt-1 font-medium">
                                    You are saving ${discount.toFixed(2)}
                                </p>
                            )}
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-base">
                                <span className="text-gray-800">Subtotal</span>
                                <span className="font-medium">
                                    ${total.toFixed(2)}
                                </span>
                            </div>

                            {points > 0 && (
                                <div className="flex justify-between text-base text-green-600">
                                    <span>Discount (Points)</span>
                                    <span>- ${discount.toFixed(2)}</span>
                                </div>
                            )}

                            <div className="border-b border-gray-300"></div>

                            <div className="flex justify-between text-xl font-bold">
                                <span>Final Total</span>
                                <span>${finalTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            className={`cursor-pointer w-full bg-black text-white py-4 text-xl font-semibold rounded-lg transition ${
                                loading
                                    ? "opacity-60 cursor-not-allowed"
                                    : "hover:bg-gray-800"
                            }`}
                            onClick={handleCheckout}
                            disabled={loading}
                        >
                            {loading
                                ? "Processing..."
                                : `Checkout for $${finalTotal.toFixed(2)}`}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
