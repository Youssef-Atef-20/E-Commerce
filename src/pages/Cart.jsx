import { useSelector, useDispatch } from "react-redux";
import {
  incQuantity,
  decQuantity,
  removeProduct,
  clearCart,
} from "../store/slices/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartBasket, subtotal } = useSelector((state) => state.cart);

  return (
    <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Shopping Cart</h1>

      {cartBasket?.length > 0 ? (
        <>
          {/* Table header */}
          <div className="hidden md:grid grid-cols-4 font-semibold text-gray-700 border-b pb-3 mb-4">
            <p>Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p className="text-right">Subtotal</p>
          </div>

          {/* Items */}
          {cartBasket.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 py-4 border-b bg-white rounded-lg mb-4 p-4"
            >
              {/* Product info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <button
                    onClick={() => dispatch(removeProduct({ id: item.id }))}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Price */}
              <p className="text-gray-700 font-medium">${item.price}</p>

              {/* Quantity */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(decQuantity({ id: item.id }))}
                  className="px-2 py-1 border rounded hover:bg-gray-200"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => dispatch(incQuantity({ id: item.id }))}
                  className="px-2 py-1 border rounded hover:bg-gray-200"
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <p className="text-right font-semibold text-gray-800">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          {/* Buttons + Summary */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
            <Link
              to="/"
              className="border border-gray-400 px-6 py-2 rounded hover:bg-gray-100"
            >
              Return To Shop
            </Link>

            <div className="flex items-center gap-6">
              <h3 className="font-semibold text-gray-700">
                Subtotal:{" "}
                <span className="text-red-600 font-bold">
                  ${subtotal.toFixed(2)}
                </span>
              </h3>
              <button
                onClick={() => dispatch(clearCart())}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className="text-gray-600">Your cart is empty 🛒</p>
      )}
    </div>
  );
};

export default Cart;
